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


  before(() => {
    console.debug = () => { } //console.log.bind(console);
  });

  describe('model', () => {

    let assertModel = (q, s, e, partialExpected) => {
      return (done) => {

        if (_.isFunction(partialExpected) && partialExpected.name === 'Error') {
          expect(() => controller.model(q, s, e)).to.throw(Error);
          done();
        } else {
          controller.model(q, s, e)
            .then(m => {

              if (_.isFunction(partialExpected)) {
                partialExpected(m);
              } else {
                expect(m).to.shallowDeepEqual(partialExpected);
              }
              done();
            })
            .catch(done);
        }
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

    xdescribe('with translations', () => {
      it('looks up translations for prompt', () => { });
      it('looks up translations for choices.label', () => { });
      it('looks up translations for outcomes.feedback', () => { });
    });

  });

  describe('outcome', () => {

    it('returns an outome?', (done) => {

      controller.outcome({
        id: '1',
        correctResponse: []
      }, {}, {})
        .then(o => {
          expect(o).to.eql({
            completed: true,
            duration: 'PT1M',
            extensions: {},
            id: '1',
            score: {
              max: 1,
              min: 0,
              raw: 1,
              scaled: 1
            }
          });
          done();
        })
        .catch(done);
    });

  });
});