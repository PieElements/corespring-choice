import * as controller from '../src/index';
import chai from 'chai';
import shallowDeepEqual from 'chai-shallow-deep-equal';
import _ from 'lodash';

chai.use(shallowDeepEqual);

const expect = chai.expect;

describe('index', () => {

  let base = (o) => {
    o = _.merge({
      model: {
        prompt: 'hi',
        choices: []
      },
      correctResponse: []
    }, o);
    return o;
  }

  describe('model', () => {

    let assertModel = (q, s, e, partialExpected) => {
      return (done) => {
        controller.model(q, s, e)
          .then(m => {
            if (_.isFunction(partialExpected)) {
              partialExpected(m);
            } else {
              expect(m).to.shallowDeepEqual(partialExpected);
            }
            done();
          })
          .catch(e => {
            if (_.isFunction(partialExpected) && partialExpected.name === 'Error') {
              done();
            } else {
              done(e);
            }
          });
      }
    }

    it('throws an error for an empty model', assertModel({}, {}, {}, Error));
    it('returns prompt', assertModel(base(), {}, {}, { prompt: 'hi' }));
    it('returns empty config for mode=gather', assertModel(base(), {}, { mode: 'gather' }, { config: {} }));
    it('returns empty config for mode=view', assertModel(base(), {}, { mode: 'view' }, { config: { disabled: true } }));
    it('returns config.disabled=true for mode=evaluate', assertModel(base(), {}, { mode: 'evaluate' }, { config: { disabled: true } }));
    it('returns className for colorContrast:black_on_rose', assertModel(base(), {}, { accessibility: { colorContrast: 'black_on_rose' } }, { className: 'black-on-rose' }));
    it('returns className for colorContrast:white_on_black', assertModel(base(), {}, { accessibility: { colorContrast: 'white_on_black' } }, { className: 'white-on-black' }));
    it('returns className for colorContrast:black_on_white', assertModel(base(), {}, { accessibility: { colorContrast: 'black_on_white' } }, { className: 'default' }));
    it('returns env', assertModel(base(), {}, { env: true }, { env: { env: true } }));

    describe('choices and outcomes', () => {
      let model, session, env;

      model = base({
        correctResponse: ['a'],
        feedback: {
          a: 'a is great',
          b: 'b is not great'
        },
        model: {
          choices: [
            { label: 'a', value: 'a' },
            { label: 'b', value: 'b' }
          ]
        }
      });
      session = { value: ['a'] }
      env = { mode: 'evaluate' }

      it('choices', assertModel(model, {}, {}, {
        choices: [
          { label: 'a', value: 'a' },
          { label: 'b', value: 'b' }
        ]
      }));

      it('returns outcomes - 1 correct', assertModel(model, session, env, {
        outcomes: [{ value: 'a', correct: true, feedback: null }]
      }));

      it('does not return config.correctResponse - 1 correct', assertModel(model, session, env, (m) => {
        expect(m.config).to.eql({ disabled: true });
      }));

      it('returns outcomes - 1 correct, 1 - incorrect', assertModel(model, { value: ['a', 'b'] }, env, {
        outcomes: [
          { value: 'a', correct: true, feedback: 'a is great' },
          { value: 'b', correct: false, feedback: 'b is not great' }]
      }));

      it('returns config.correctResponse - 1 correct, 1 - incorrect', assertModel(model, { value: ['a', 'b'] }, env, {
        config: {
          correctResponse: ['a']
        }
      }));
    });

    describe('with translations', () => {

      let model = {
        correctResponse: ['a', 'b'],
        translations: {
          en_US: {
            PROMPT: 'hi',
            LABEL: 'Apple',
            A_FEEDBACK: 'Feedback'
          },
          es_ES: {
            PROMPT: 'hola',
            LABEL: 'Ahoy',
            A_FEEDBACK: 'Fuego'
          }
        },
        feedback: {
          a: '$A_FEEDBACK',
          b: '$B_FEEDBACK'
        },
        model: {
          prompt: '$PROMPT',
          choices: [
            { label: '$LABEL', value: 'a' }
          ]
        }
      };

      let session = {};
      let env = {};

      it('looks up translations for prompt', assertModel(model, session, env, { prompt: 'hi' }));
      it('looks up translations for label', assertModel(model, session, env, { choices: [{ label: 'Apple' }] }));
      it('looks up translations for prompt in spanish', assertModel(model, session, { locale: 'es_ES' }, { prompt: 'hola' }));
      it('looks up translations for label in spanish', assertModel(model, session, { locale: 'es_ES' }, { choices: [{ label: 'Ahoy' }] }));
      it('looks up translations for feedback', assertModel(model, { value: ['a'] }, { mode: 'evaluate' }, { outcomes: [{ feedback: 'Feedback' }] }));
      it('looks up translations for feedback in spanish', assertModel(model, { value: ['a'] }, { mode: 'evaluate', locale: 'es_ES' }, { outcomes: [{ feedback: 'Fuego' }] }));
    });

  });

  describe('outcome', () => {

    let outcome = (q, s, e, handler) => {
      return (done) => {
        controller.outcome(q, s, e)
          .then(o => {
            handler(o);
            done();
          })
          .catch(e => {
            handler(e);
            done();
          });
      }
    }

    it('returns an error if the question is null', outcome(null, {}, {}, (result) => {
      expect(result.message).to.eql('Question is missing required array: correctResponse');
    }));

    it('returns an error if the question.correctResponse', outcome({}, {}, {}, (result) => {
      expect(result.message).to.eql('Question is missing required array: correctResponse');
    }));

    it('returns an error if the question.correctResponse is empty', outcome({ correctResponse: [] }, {}, {}, (result) => {
      expect(result.message).to.eql('Question is missing required array: correctResponse');
    }));

    it('returns score.scaled: 1 for a correct response', outcome({
      correctResponse: ['a']
    }, { value: ['a'] }, null, (result) => {
      expect(result).to.eql({
        score: {
          scaled: 1
        }
      })
    }));

    it('returns score.scaled: 0 for an incorrect response', outcome({
      correctResponse: ['a']
    }, { value: ['b'] }, null, (result) => {
      expect(result).to.eql({
        score: {
          scaled: 0
        }
      })
    }));

  });
});