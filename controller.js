const _ = require('lodash'); 

exports.model = function(question, session, env) {

  function lookup(value) {

    var localeKey = env.locale || (question.translations || {}).default_locale || 'en_US';
    var map = ((question.translations || {})[localeKey] || {});
    if (value.indexOf('$') === 0) {
      var key = value.substring(1);
      var out = map[key];
      if (!out) {
        console.warn('not able to find translation for: ' + key);
      }
      return out || value;
    } else {
      return value;
    }
  }

  console.debug('[state] question:', JSON.stringify(question, null, '  '));
  console.debug('[state] session:', JSON.stringify(session, null, '  '));
  console.debug('[state] env:', JSON.stringify(env, null, '  '));

  function createOutcomes(responses, allCorrect) {
    return _.map(responses, function (v) {
      var correct = _.includes(question.correctResponse, v);
      var feedback = lookup(question.feedback[v]);
      return { value: v, correct: correct, feedback: allCorrect ? null : feedback };
    });
  }

  var cfg = _.assign({}, question.model);
  
  cfg.prompt = lookup(cfg.prompt);
  cfg.choices = _.map(cfg.choices, function (c) {
    c.label = lookup(c.label)
    return c;
  });

  var base = _.assign({}, question.model); 
  base.outcomes = [];

  base.config = cfg;

  if (env.mode !== 'gather') {
    base.config.disabled = true;
  }

  if (env.mode === 'evaluate') {

    var responses = _.isArray(session.value) ? session.value : [];

    var allCorrect = _.isEqual(responses, question.correctResponse.sort());
    console.log('session.value: allCorrect', allCorrect, responses, typeof (session.value), 'question.correctResponse: ', question.correctResponse, typeof (question.correctResponse));

    if (!allCorrect) {
      base.config.correctResponse = question.correctResponse;
    }
    base.outcomes = createOutcomes(responses, allCorrect);
  }

  var correct = _.isEqual(question.correctResponse, session.response);
  var feedback = question.model.feedback || { correct: 'correct', incorrect: 'incorrect'}  

  base.env = env;

  var map = {
    black_on_rose: 'black-on-rose',
    white_on_black: 'white-on-black',
    black_on_white: 'default'
  };

  if (env.accessibility && env.accessibility.colorContrast && map[env.accessibility.colorContrast]){
    base.className = map[env.accessibility.colorContrast];
  }

  console.debug('[state] return: ' + JSON.stringify(base, null, '  '));
  return base;
};