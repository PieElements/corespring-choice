import _ from 'lodash';

/** 
 * For the documentation of pie controllers see
 * https://pielabs.github.io/pie-docs/developing/controller.html
 */

export function outcome(question, session, env) {
    const responses = _.isArray(session.value) ? session.value : [];
    const allCorrect = _.isEqual(responses.sort(), question.correctResponse.sort());

    const raw = allCorrect ? 1 : 0;
    const min = 0;
    const max = 1;
    const scaled = (raw - min) / (max - min);

    const id = question.id;
    const score = {
      scaled, raw, min, max
    };
    const completed = true;
    const duration = "PT1M"; //one minute, see https://en.wikipedia.org/wiki/ISO_8601#Durations
    const extensions = {};
    const outcome = {
      id, score, completed, duration, extensions
    };

    return Promise.resolve(outcome);
}

export function model(question, session, env) {

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
      return _.map(responses, function(v) {
        var correct = _.includes(question.correctResponse, v);
        var feedback = lookup(question.feedback[v]);
        return {
          value: v,
          correct: correct,
          feedback: allCorrect ? null : feedback
        };
      });
    }

    var cfg = _.assign({}, question.model);

    cfg.prompt = lookup(cfg.prompt);
    cfg.choices = _.map(cfg.choices, function(c) {
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
      console.log('session.value: allCorrect', allCorrect, responses, typeof(session.value), 'question.correctResponse: ', question.correctResponse, typeof(question.correctResponse));

      if (!allCorrect) {
        base.config.correctResponse = question.correctResponse;
      }
      base.outcomes = createOutcomes(responses, allCorrect);
    }

    base.env = env;

    var map = {
      black_on_rose: 'black-on-rose',
      white_on_black: 'white-on-black',
      black_on_white: 'default'
    };

    if (env.accessibility && env.accessibility.colorContrast && map[env.accessibility.colorContrast]) {
      base.className = map[env.accessibility.colorContrast];
    }

    console.debug('[state] return: ' + JSON.stringify(base, null, '  '));
    return Promise.resolve(base);
}




