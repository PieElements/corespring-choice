import React from 'react';
import { shallow } from 'enzyme';
import { stub, assert } from 'sinon';
import { expect } from 'chai';
import proxyquire from 'proxyquire';
import Checkbox from 'material-ui/Checkbox';
import RadioButton from 'material-ui/RadioButton';
import _ from 'lodash';


describe('ChoiceInput', () => {
  let onChange, wrapper, muiTheme, ChoiceInput;

  beforeEach(() => {
    muiTheme = {
      correctColor: 'green',
      incorrectColor: 'red',
      checkbox: {
        disabledColor: 'grey'
      }
    }
  });

  let mkWrapper = (opts = {}) => {

    opts = _.extend({
      choiceMode: 'checkbox',
      label: 'label',
      displayKey: '1',
      correctness: 'correct',
      value: 'value'
    }, opts);

    return shallow(<ChoiceInput
      display-key={opts.displayKey}
      checked={opts.checked}
      choiceMode={opts.choiceMode}
      correctness={opts.correctness}
      disabled={opts.disabled}
      feedback={opts.feedback}
      label={opts.label}
      onChange={onChange}
      value={opts.value}
      muiTheme={muiTheme}
      />, {});

  }

  beforeEach(() => {
    ChoiceInput = proxyquire('../src/choice-input', {
    }).ChoiceInput;

    onChange = stub();
    wrapper = mkWrapper();
  });

  describe('render', () => {

    describe('radio', () => {
      beforeEach(() => {
        wrapper = mkWrapper({choiceMode: 'radio'});
      });
      
      it('has a .corespring-radio-button class', () => {
        expect(wrapper.hasClass('corespring-radio-button')).to.eql(true);
      });
      
      it('has a checkbox-holder', () => {
        let holder = wrapper.find('.checkbox-holder');
        expect(holder).to.have.length(1);
      });

      it('sets the label on RadioButton', () => {
        let cb = wrapper.find(RadioButton);
        expect(cb.prop('label')).to.eql('1. label');
      });
    });

    describe('checkbox', () => {

      it('has .corespring-checkbox class', () => {
        expect(wrapper.hasClass('corespring-checkbox')).to.eql(true);
      });

      it('has a checkbox-holder', () => {
        let holder = wrapper.find('.checkbox-holder');
        expect(holder).to.have.length(1);
      });

      it('sets the label on Checkbox', () => {
        let cb = wrapper.find(Checkbox);
        expect(cb.prop('label')).to.eql('1. label');
      });
    });
  });

  describe('getTheme', () => {
    it('sets the correct theme.checkbox.disabledColor', () => {
      let checkbox = mkWrapper({ correctness: 'correct' });
      let theme = checkbox.instance().getTheme();
      expect(theme.checkbox.disabledColor).to.eql('green');
    });

    it('sets the incorrect theme.checkbox.disabledColor', () => {
      let checkbox = mkWrapper({ correctness: 'incorrect' });
      let theme = checkbox.instance().getTheme();
      expect(theme.checkbox.disabledColor).to.eql('red');
    });

    it('sets the default theme.checkbox.disabledColor', () => {
      let checkbox = mkWrapper({ correctness: null });
      let theme = checkbox.instance().getTheme();
      expect(theme.checkbox.disabledColor).to.eql('grey');
    });
  });

  describe('onCheck', () => {

    it('calls handler', () => {
      wrapper.instance().onCheck({ target: { checked: true } });
      assert.calledWith(onChange, { value: 'value', selected: true });
    });
  });

});