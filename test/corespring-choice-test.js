import React from 'react';
import { shallow } from 'enzyme';
import { stub, assert } from 'sinon';
import { expect } from 'chai';
import proxyquire from 'proxyquire';
import _ from 'lodash';
import ChoiceInput from '../src/choice-input';

describe('CorespringChoice', () => {

  let wrapper, CorespringChoice, toggle;

  beforeEach(() => {

    toggle = () => {
      return <div>mocked-toggle</div>
    }

    toggle['@noCallThru'] = true;

    CorespringChoice = proxyquire('../src/corespring-choice', {
      'corespring-correct-answer-toggle': toggle
    }).default;
  });

  let mkWrapper = (opts, clone = true) => {

    opts = clone ? opts = _.merge({
      choices: [],
      mode: 'gather'
    }, opts) : opts;

    return shallow(<CorespringChoice
      choices={opts.choices}
      correctResponse={opts.correctResponse}
      prompt={opts.prompt}
      onChange={opts.onChange}
      session={opts.session}
      mode={opts.mode} />);
  }

  describe('render', () => {

    describe('with 2 choices', () => {
      beforeEach(() => {
        wrapper = mkWrapper({
          choices: [
            { value: 'a', label: 'label a' },
            { value: 'b', label: 'label b' }
          ],
          correctResponse: ['a']
        });
      });

      it('has corespring-choice class', () => {
        expect(wrapper.hasClass('corespring-choice')).to.eql(true);
      });

      it('has 2 ChoiceInputs', () => {
        expect(wrapper.find(ChoiceInput)).to.have.length(2);
      });

      it('sets 2 ChoiceInput classNames to [choice]', () => {
        expect(wrapper.find('.choice')).to.have.length(2);
      });

      it('sets the last ChoiceInput className to [choice last]', () => {
        expect(wrapper.find('.choice.last')).to.have.length(1);
      });

      it('sets the label', () => {
        let first = wrapper.find(ChoiceInput).get(0);
        expect(first.props.label).to.eql('label a');
      });

      it('sets the display-key on ChoiceInput', () => {
        let first = wrapper.find(ChoiceInput).get(0);
        expect(first.props['display-key']).to.eql('A');
        let second = wrapper.find(ChoiceInput).get(1);
        expect(second.props['display-key']).to.eql('B');
      });

      it('sets the correctness from correctResponse', () => {
        wrapper = wrapper.setProps({ mode: 'evaluate' });
        wrapper.setState({ showCorrect: true });
        let first = wrapper.find(ChoiceInput).get(0);
        expect(first.props.correctness).to.eql('correct');
      });

      it('sets the correctness from outcomes', () => {
        wrapper = wrapper.setProps({ outcomes: [{ value: 'a', correct: true }] });
        let first = wrapper.find(ChoiceInput).get(0);
        expect(first.props.correctness).to.eql('correct');
      });

      it('sets the feedback', () => {
        wrapper = wrapper.setProps({ outcomes: [{ value: 'a', correct: true, feedback: 'great' }] });
        let first = wrapper.find(ChoiceInput).get(0);
        expect(first.props.feedback).to.eql('great');
      });
    });

    describe('prompt', () => {

      it('sets the prompt', () => {
        expect(mkWrapper({ prompt: 'hi' }).find('.prompt').text()).to.eql('hi');
      });
    });

    describe('onToggle', () => {

      it('toggles the state', () => {
        let w = mkWrapper({ mode: 'evaluate' });
        expect(w.state('showCorrect')).to.eql(false);
        w.instance().onToggle();
        expect(w.state('showCorrect')).to.eql(true);
      });
    });

    describe('onChange', () => {
      let onChange, session;
      beforeEach(() => {
        onChange = stub();

        session = {
          value: ['b']
        }

        wrapper = mkWrapper({ choices: [], session: session, onChange: onChange }, false);
      });

      it('calls onChange handler', () => {
        wrapper.instance().onChange({});
        assert.calledWith(onChange, {});
      });

      it('adds the selection', () => {
        wrapper.instance().onChange({ value: 'a', selected: true });
        expect(session.value).to.eql(['b', 'a']);
      });

      it('removes the selection', () => {
        wrapper.instance().onChange({ value: 'a', selected: true });
        expect(session.value).to.eql(['b', 'a']);
        wrapper.instance().onChange({ value: 'a', selected: false });
        expect(session.value).to.eql(['b']);
      });

      describe('choiceMode=radio', () => {
        beforeEach(() => {
          wrapper.setProps({ choiceMode: 'radio' });
        });

        it('removes the selection when choiceMode=radio', () => {
          wrapper.instance().onChange({ value: 'b', selected: false });
          expect(session.value).to.eql([]);
        });

        it('adds a new choice when choiceMode', () => {
          wrapper.instance().onChange({ value: 'b', selected: false });
          wrapper.instance().onChange({ value: 'b', selected: true });
          expect(session.value).to.eql(['b']);
        });

        it('removes the selection with a new selection when choiceMode=radio', () => {
          wrapper.instance().onChange({ value: 'a', selected: true });
          expect(session.value).to.eql(['a']);
        });
      });
    });

    describe('show toggle', () => {

      it('has toggle if there is no correctResponse', () => {
        expect(mkWrapper().find('toggle')).to.have.length(1);
      });

      it('toggle show is set to false', () => {
        expect(mkWrapper().find('toggle').prop('show')).to.be.false;
      });

      it('has toggle if there is correctResponse', () => {
        expect(mkWrapper({ correctResponse: [{}] }).find('toggle')).to.have.length(1);
      });

      it('has toggle if there is correctResponse', () => {
        expect(mkWrapper({ correctResponse: [{}] }).find('toggle').prop('show')).to.be.true;
      });

      it('sets toggle.toggled to false if showCorrect=false && mode=evaluate', () => {
        let w = mkWrapper({ correctResponse: [], mode: 'evaluate' });
        w.setState({ showCorrect: false });
        expect(w.find('toggle').prop('toggled')).to.eql(false);
      });

      it('sets toggle.toggled to true if showCorrect=true && mode=evaluate', () => {
        let w = mkWrapper({ correctResponse: [], mode: 'evaluate' });
        w.setState({ showCorrect: true });
        expect(w.find('toggle').prop('toggled')).to.eql(true);
      });

      it('sets the toggle.toggled to false if showCorrect=true && mode!=evaluate', () => {
        let w = mkWrapper({ correctResponse: [] });
        w.setState({ showCorrect: true });
        expect(w.find('toggle').prop('toggled')).to.eql(false);
      });
    })
  });
});