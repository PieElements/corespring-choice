import Main from './main.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

export default class ChoiceConfigReactElement extends HTMLElement {

  constructor() {
    super();
  }

  set model(s) {
    this._model = s;
    this._rerender();
  }

  onChoiceModeChanged(event, key, value) {
    this._model.model.choiceMode = value;
    let detail = {
      update: this._model
    };
    this.dispatchEvent(new CustomEvent('model.updated', {bubbles: true, detail}));
    this._rerender();
  }

  onKeyModeChanged(event, key, value) {
    this._model.model.keyMode = value;
    let detail = {
      update: this._model
    };
    this.dispatchEvent(new CustomEvent('model.updated', {bubbles: true, detail}));
    this._rerender();
  }

  onChoicesChanged(choices) {
    this._model.model.choices = choices;
    let detail = {
      update: this._model
    };
    this.dispatchEvent(new CustomEvent('model.updated', {bubbles: true, detail}));
    this._rerender();
  }

  onFeedbackChanged(feedback) {
    console.log('feedback changed: ', feedback);
    this._model.model.feedback = feedback;
    let detail = {
      update: this._model
    };
    this.dispatchEvent(new CustomEvent('model.updated', {bubbles: true, detail}));
    this._rerender();
  }

  onPartialScoringChanged(partialScoring) {
    this._model.partialScoring = partialScoring;
    let detail = {
      update: this._model
    };
    this.dispatchEvent(new CustomEvent('model.updated', {bubbles: true, detail}));
    this._rerender();
  }

  _rerender() {
    let element = React.createElement(Main, {
      model: this._model,
      onChoiceModeChanged: this.onChoiceModeChanged.bind(this),
      onKeyModeChanged: this.onKeyModeChanged.bind(this),
      onChoicesChanged: this.onChoicesChanged.bind(this),
      onFeedbackChanged: this.onFeedbackChanged.bind(this),
      onPartialScoringChanged: this.onPartialScoringChanged.bind(this)
    });
    ReactDOM.render(element, this);
  }

}