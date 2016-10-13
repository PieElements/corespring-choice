
  (function(root){
    root.pie = root.pie || {};

    var supportedLibraries = {
      lodash: _
    }

    /**
     * add support for require in modules
     */
    root.pie.require = function(name){
      if(supportedLibraries.hasOwnProperty(name)){
        if(!supportedLibraries[name]){
          throw new Error('This library is supported but maybe it has not been loaded? ' + name);
        } else {
          return supportedLibraries[name];
        }
      } else {
        throw new Error('This library is not supported: ' + name);
      }
    }

    root.pie.controllerMap = root.pie.controllerMap || {};
    
root.pie.controllerMap['corespring-multiple-choice-react'] = {};
(function(exports, require){
  'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.outcome = outcome;
exports.model = model;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** 
 * For the documentation of pie controllers see
 * https://pielabs.github.io/pie-docs/developing/controller.html
 */

function outcome(question, session, env) {
  var responses = _lodash2.default.isArray(session.value) ? session.value : [];
  var allCorrect = _lodash2.default.isEqual(responses.sort(), question.correctResponse.sort());

  var raw = allCorrect ? 1 : 0;
  var min = 0;
  var max = 1;
  var scaled = (raw - min) / (max - min);

  var id = question.id;
  var score = {
    scaled: scaled, raw: raw, min: min, max: max
  };
  var completed = true;
  var duration = "PT1M"; //one minute, see https://en.wikipedia.org/wiki/ISO_8601#Durations
  var extensions = {};
  var outcome = {
    id: id, score: score, completed: completed, duration: duration, extensions: extensions
  };

  return Promise.resolve(outcome);
}

function model(question, session, env) {

  function lookup(value) {

    var localeKey = env.locale || (question.translations || {}).default_locale || 'en_US';
    var map = (question.translations || {})[localeKey] || {};
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
    return _lodash2.default.map(responses, function (v) {
      var correct = _lodash2.default.includes(question.correctResponse, v);
      var feedback = lookup(question.feedback[v]);
      return {
        value: v,
        correct: correct,
        feedback: allCorrect ? null : feedback
      };
    });
  }

  var cfg = _lodash2.default.assign({}, question.model);

  cfg.prompt = lookup(cfg.prompt);
  cfg.choices = _lodash2.default.map(cfg.choices, function (c) {
    c.label = lookup(c.label);
    return c;
  });

  var base = _lodash2.default.assign({}, question.model);
  base.outcomes = [];

  base.config = cfg;

  if (env.mode !== 'gather') {
    base.config.disabled = true;
  }

  if (env.mode === 'evaluate') {

    var responses = _lodash2.default.isArray(session.value) ? session.value : [];

    var allCorrect = _lodash2.default.isEqual(responses, question.correctResponse.sort());
    console.log('session.value: allCorrect', allCorrect, responses, _typeof(session.value), 'question.correctResponse: ', question.correctResponse, _typeof(question.correctResponse));

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
})(root.pie.controllerMap['corespring-multiple-choice-react'], root.pie.require)

  })(this);
  