jest.unmock('../src/corespring-feedback');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import CorespringFeedback from '../src/corespring-feedback';

describe('CorespringFeedback', () => {

  describe('with no defined feedback attribute', () => {
    const feedback = TestUtils.renderIntoDocument(
      <CorespringFeedback correctness="correct" />
    );
    const feedbackNode = ReactDOM.findDOMNode(feedback);

    it('should render an empty div', () => {
      expect(feedbackNode.textContent).toBe('');
    });

  });

  describe('with defined feedback attribute', () => {
    const feedbackText = "great";
    const feedbackClass = "correct";
    const feedback = TestUtils.renderIntoDocument(
      <CorespringFeedback correctness={feedbackClass} feedback={feedbackText} />
    );
    const feedbackNode = ReactDOM.findDOMNode(feedback);

    it('should contain feedback text', () => {
      expect(feedbackNode.textContent).toBe(feedbackText);
    });

    describe('class', () => {

      it('should have feedback class', () => {
        expect(feedbackNode.className).toContain(feedbackClass);
      });

      it('should have "corespring-feedback"', () => {
        expect(feedbackNode.className).toContain('corespring-feedback');
      });

    })

  });

});