jest.unmock('../src/corespring-feedback-tick');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import CorespringFeedbackTick from '../src/corespring-feedback-tick';

describe('CorespringFeedbackTick', () => {

  describe('with correctness "correct"', () => {
    const feedbackTick = TestUtils.renderIntoDocument(
      <CorespringFeedbackTick correctness="correct" />
    );
    const feedbackTickNode = ReactDOM.findDOMNode(feedbackTick);

    it('renders .incorrect-icon with .hide', () => {
      expect(feedbackTickNode.getElementsByClassName('incorrect-icon')[0].className).toContain('hide');
    });

    it('renders .correct-icon without .hide', () => {
      expect(feedbackTickNode.getElementsByClassName('correct-icon')[0].className).not.toContain('hide');
    });
  });

  describe('with correctness "incorrect"', () => {
    const feedbackTick = TestUtils.renderIntoDocument(
      <CorespringFeedbackTick correctness="incorrect" />
    );
    const feedbackTickNode = ReactDOM.findDOMNode(feedbackTick);

    it('renders .incorrect-icon without .hide', () => {
      expect(feedbackTickNode.getElementsByClassName('incorrect-icon')[0].className).not.toContain('hide');
    });

    it('renders .correct-icon with .hide', () => {
      expect(feedbackTickNode.getElementsByClassName('correct-icon')[0].className).toContain('hide');
    });
  });

});