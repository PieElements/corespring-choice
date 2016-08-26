jest.unmock('../src/corespring-show-correct-answer-toggle');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import CorespringShowCorrectAnswerToggle from '../src/corespring-show-correct-answer-toggle';

describe('CorespringShowCorrectAnswerToggle', () => {

  describe('show attribute is false', () => {
    const toggle = TestUtils.renderIntoDocument(
      <CorespringShowCorrectAnswerToggle toggle={true} show={false} />
    );
    const toggleNode = ReactDOM.findDOMNode(toggle);

    it('should render an empty div', () => {
      expect(toggleNode.innerHTML).toBe('');
    });

  });

  describe('show attribute is true', () => {

    describe('toggle attribute is true', () => {
      const toggle = TestUtils.renderIntoDocument(
        <CorespringShowCorrectAnswerToggle toggle={true} show={true} />
      );
      const toggleNode = ReactDOM.findDOMNode(toggle);

      it('should render elements with .hide-icon-background', () => {
        expect(toggleNode.querySelectorAll('.hide-icon-background').length).not.toBe(0);
      });

      it('should not render elements with .show-icon-background', () => {
        expect(toggleNode.querySelectorAll('.show-icon-background').length).toBe(0);
      });

      it('should display the default hideMessage property in its .label', () => {
        expect(toggleNode.querySelectorAll('.label')[0].textContent).toBe(
            CorespringShowCorrectAnswerToggle.getDefaultProps().hideMessage);
      });

      describe('hideMessage property is defined', () => {
        const hideMessage = "Hide!";
        const toggle = TestUtils.renderIntoDocument(
          <CorespringShowCorrectAnswerToggle toggle={true} show={true} hideMessage={hideMessage} />
        );
        const toggleNode = ReactDOM.findDOMNode(toggle);

        it('should display the provided hideMessage property in its .label', () => {
          expect(toggleNode.querySelectorAll('.label')[0].textContent).toBe(hideMessage);
        });
      });

    });

    describe('toggle attribute is false', () => {
      const toggle = TestUtils.renderIntoDocument(
        <CorespringShowCorrectAnswerToggle toggle={false} show={true} />
      );
      const toggleNode = ReactDOM.findDOMNode(toggle);

      it('should render elements with .show-icon-background', () => {
        expect(toggleNode.querySelectorAll('.show-icon-background').length).not.toBe(0);
      });

      it('should not render elements with .hide-icon-background', () => {
        expect(toggleNode.querySelectorAll('.hide-icon-background').length).toBe(0);
      });

      it('should display the default hideMessage property in its .label', () => {
        expect(toggleNode.querySelectorAll('.label')[0].textContent).toBe(
            CorespringShowCorrectAnswerToggle.getDefaultProps().showMessage);
      });

      describe('showMessage property is defined', () => {
        const showMessage = "Show!";
        const toggle = TestUtils.renderIntoDocument(
          <CorespringShowCorrectAnswerToggle toggle={false} show={true} showMessage={showMessage} />
        );
        const toggleNode = ReactDOM.findDOMNode(toggle);

        it('should display the provided showMessage property in its .label', () => {
          expect(toggleNode.querySelectorAll('.label')[0].textContent).toBe(showMessage);
        });
      });

    });

  });

  describe('clicking the element', () => {
    const onClick = jest.fn();

    const toggle = TestUtils.renderIntoDocument(
      <CorespringShowCorrectAnswerToggle toggle={false} show={true} onClick={onClick} />
    );
    const toggleNode = ReactDOM.findDOMNode(toggle);

    TestUtils.Simulate.click(toggleNode);

    it('should trigger provided onClick function', () => {
      expect(onClick.mock.calls.length).toBe(1);
    });

  });

});