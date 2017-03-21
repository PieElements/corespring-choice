import { applyChange, convert } from './convert';

import Main from './main.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

export default class ChoiceConfigReactElement extends HTMLElement {

  constructor() {
    super();

    this.onRemoveChoice = this.onRemoveChoice.bind(this);
    this.onAddChoice = this.onAddChoice.bind(this);
  }

  set model(s) {
    this._model = s;
    this._rerender();
  }

  onChoiceModeChanged(event, value) {
    this._model.model.choiceMode = value;
    let detail = {
      update: this._model
    };
    this.dispatchEvent(new CustomEvent('model.updated', { bubbles: true, detail }));
    this._rerender();
  }

  onRemoveChoice(index) {
    this._model.model.choices.splice(index, 1);
    let detail = {
      update: this._model
    };
    this.dispatchEvent(new CustomEvent('model.updated', { bubbles: true, detail }));
    this._rerender();
  }

  onAddChoice() {
    this._model.model.choices.push({
      label: '$' + '_choice_' + this._model.model.choices.length,
      value: ''
    });

    let detail = {
      update: this._model
    };
    this.dispatchEvent(new CustomEvent('model.updated', { bubbles: true, detail }));
    this._rerender();
  }

  onKeyModeChanged(event, value) {
    this._model.model.keyMode = value;
    let detail = {
      update: this._model
    };
    this.dispatchEvent(new CustomEvent('model.updated', { bubbles: true, detail }));
    this._rerender();
  }

  onChoiceChanged(index, choice) {
    this._model = applyChange(this._model, index, choice);
    let detail = {
      update: this._model
    };

    this.dispatchEvent(new CustomEvent('model.updated', { bubbles: true, detail }));
    this._rerender();
  }

  onFeedbackChanged(feedback) {
    console.log('feedback changed: ', feedback);
    this._model.model.feedback = feedback;
    let detail = {
      update: this._model
    };
    this.dispatchEvent(new CustomEvent('model.updated', { bubbles: true, detail }));
    this._rerender();
  }


  _rerender() {
    let configureModel = convert(this._model);

    let element = React.createElement(Main, {
      model: configureModel,
      onChoiceModeChanged: this.onChoiceModeChanged.bind(this),
      onKeyModeChanged: this.onKeyModeChanged.bind(this),
      onChoiceChanged: this.onChoiceChanged.bind(this),
      onRemoveChoice: this.onRemoveChoice,
      onAddChoice: this.onAddChoice
    });
    ReactDOM.render(element, this);
  }

}