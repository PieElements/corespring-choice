import { applyChoiceChange, applyPromptChange, convert, removeChoice } from './convert';

import Main from './main.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

class ModelUpdatedEvent extends CustomEvent {
  constructor(m) {
    super('model.updated', {
      bubbles: true,
      detail: {
        update: m
      }
    });
  }
}

export default class ChoiceConfigReactElement extends HTMLElement {

  constructor() {
    super();
    this.onRemoveChoice = this.onRemoveChoice.bind(this);
    this.onAddChoice = this.onAddChoice.bind(this);
    this.onChoiceModeChanged = this.onChoiceModeChanged.bind(this);
    this.onKeyModeChanged = this.onKeyModeChanged.bind(this);
    this.onChoiceChanged = this.onChoiceChanged.bind(this);
    this.onPromptChanged = this.onPromptChanged.bind(this);
  }

  set model(s) {
    this._model = s;
    this._rerender();
  }

  onChoiceModeChanged(event, value) {
    this._model.model.choiceMode = value;
    this.dispatchModelUpdated();
    this._rerender();
  }

  onRemoveChoice(index) {
    this._model = removeChoice(this._model, index);
    this.dispatchModelUpdated();
    this._rerender();
  }

  dispatchModelUpdated() {
    this.dispatchEvent(new ModelUpdatedEvent(this._model));
  }

  onAddChoice() {
    this._model.model.choices.push({
      label: '$' + 'choice_' + this._model.model.choices.length,
      value: ''
    });

    this.dispatchModelUpdated();
    this._rerender();
  }

  onKeyModeChanged(event, value) {
    this._model.model.keyMode = value;
    this.dispatchModelUpdated();
    this._rerender();
  }

  onChoiceChanged(index, choice) {
    this._model = applyChoiceChange(this._model, index, choice);
    this.dispatchModelUpdated();
    this._rerender();
  }

  onFeedbackChanged(feedback) {
    this._model.model.feedback = feedback;
    let detail = {
      update: this._model
    };
    this.dispatchModelUpdated();
    this._rerender();
  }

  onPromptChanged(update, lang) {
    this._model = applyPromptChange(this._model, update, lang);
    this.dispatchModelUpdated();
    this._rerender();
  }

  _rerender() {
    // console.log('[_rerender]', JSON.stringify(this._model, null, '  '));
    let configureModel = convert(this._model);

    let element = React.createElement(Main, {
      model: configureModel,
      onChoiceModeChanged: this.onChoiceModeChanged,
      onKeyModeChanged: this.onKeyModeChanged,
      onChoiceChanged: this.onChoiceChanged,
      onRemoveChoice: this.onRemoveChoice,
      onAddChoice: this.onAddChoice,
      onPromptChanged: this.onPromptChanged
    });
    ReactDOM.render(element, this);
  }
}