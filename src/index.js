import Main from './main.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash/debounce';
import { updateSessionValue } from './session-updater';

export default class CorespringMultipleChoiceReactElement extends HTMLElement {

  constructor() {
    super();
    this._model = null;
    this._session = null;

    this._rerender = debounce(() => {
      if (this._model && this._session) {
        var element = React.createElement(Main,
          {
            model: this._model,
            session: this._session,
            onChoiceChanged: this._onChange.bind(this)
          });
        ReactDOM.render(element, this);
      } else {
        console.log('skip');
      }
    }, 50, { leading: false, trailing: true });
  }

  set model(s) {
    this._model = s;
    this._rerender();
  }

  get session() {
    return this._session;
  }

  set session(s) {
    this._session = s;
    this._rerender();
  }

  _onChange(data) {
    this._session.value = this._session.value || [];

    updateSessionValue(this._session, this._model.choiceMode, data);

    var event = new CustomEvent('pie', {
      bubbles: true,
      detail: {
        type: 'sessionChanged',
        component: this.tagName.toLowerCase()
      }
    });

    this.dispatchEvent(event);
    this._rerender();
  };

  connectedCallback() {
    this.dispatchEvent(new CustomEvent('pie.register', { bubbles: true }));
    this._rerender();
  }

}