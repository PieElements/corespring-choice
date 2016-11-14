import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import proxyquire from 'proxyquire';
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

describe('CorespringFeedback', () => {

  let wrapper, Feedback, muiTheme;

  beforeEach(() => {
    muiTheme = {
      correctColor: 'green',
      incorrectColor: 'red',
      palette: {
        textColor: 'black',
        canvasColor: 'white'
      }
    }
  });

  let mkWrapper = (opts = {}) => {

    opts = _.merge({
      correctness: 'correct',
      feedback: 'feedback'
    }, opts);

    return shallow(<Feedback
      correctness={opts.correctness}
      feedback={opts.feedback}
      muiTheme={muiTheme}
      />,
      {});
  }

  beforeEach(() => {
    Feedback = proxyquire('../src/feedback', {
    }).Feedback;

  });

  describe('render', () => {

    describe('incorrect', () => {
      beforeEach(() => {
        wrapper = mkWrapper({ correctness: 'incorrect' });
      });

      it('has incorrect feedback div', () => {
        expect(wrapper.find('.corespring-feedback.incorrect')).to.have.length(1);
      });
    });

    describe('correct', () => {
      beforeEach(() => {
        wrapper = mkWrapper();
      });

      it('has ReactCSSTransitionGroup', () => {
        expect(wrapper.find(ReactCSSTransitionGroup)).to.have.length(1);
      });

      it('has correct feedback div', () => {
        expect(wrapper.find('.corespring-feedback.correct')).to.have.length(1);
      });

      it('has feedback content', () => {
        expect(wrapper.find('.content').text()).to.eql('feedback');
      });
    });
    describe('no correctness', () => {
      beforeEach(() => {
        wrapper = mkWrapper({ correctness: null });
      });

      it('has no feedback', () => {
        expect(wrapper.find('.corespring-feedback')).to.have.length(0);
      });
    });

    describe('no feedback', () => {
      beforeEach(() => {
        wrapper = mkWrapper({ feedback: null });
      });

      it('has no feedback', () => {
        expect(wrapper.find('.corespring-feedback')).to.have.length(0);
      });
    });
  });

  describe('getStyle', () => {

    let instance;

    beforeEach(() => {
      wrapper = mkWrapper();
      instance = wrapper.instance();
    });

    it('returns incorrect style', () => {
      expect(instance.getStyle('incorrect')).to.eql({
        color: 'red',
        'background-color': 'white'
      });
    });

    it('returns correct style', () => {
      expect(instance.getStyle('correct')).to.eql({
        color: 'green',
        'background-color': 'white'
      });
    });

    it('returns default style', () => {
      expect(instance.getStyle(null)).to.eql({
        color: 'black',
        'background-color': 'white'
      });
    });
  });
});