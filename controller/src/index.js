import _ from 'lodash';

/** 
 * For the documentation of pie controllers see
 * https://pielabs.github.io/pie-docs/developing/controller.html
 */

export function outcome(question, session = { value: [] }) {
  session.value = session.value || [];
  return new Promise((resolve, reject) => {
    if (!question || !question.correctResponse || _.isEmpty(question.correctResponse)) {
      reject(new Error('Question is missing required array: correctResponse'));
    } else {
      const allCorrect = _.isEqual(session.value.sort(), question.correctResponse.sort());
      resolve({
        score: {
          scaled: allCorrect ? 1 : 0
        }
      });
    }
  });
}

export function model(question, session, env) {

  function lookup(value) {
    if (!value) {
      return;
    }
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

  function createOutcomes(responses, allCorrect) {
    return _.map(responses, function (v) {
      var correct = _.includes(question.correctResponse, v);
      var feedback = lookup(question.feedback[v]);
      return {
        value: v,
        correct: correct,
        feedback: allCorrect ? null : feedback
      };
    });
  }

  return new Promise((resolve/*, reject*/) => {

    var base = _.assign({}, _.cloneDeep(question.model));

    base.prompt = lookup(base.prompt);
    base.choices = _.map(base.choices, function (c) {
      c.label = lookup(c.label);
      return c;
    });

    base.outcomes = [];
    base.config = {};

    if (env.mode !== 'gather') {
      base.config.disabled = true;
    }

    if (env.mode === 'evaluate') {

      var responses = _.isArray(session.value) ? session.value : [];

      var allCorrect = _.isEqual(responses, question.correctResponse.sort());

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

    resolve(base);
  });
}




