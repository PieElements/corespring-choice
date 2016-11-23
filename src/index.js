import Main from './main.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import Icon from './icon';

export default class CorespringMultipleChoiceReactElement extends HTMLElement {

  constructor() {
    super();
    this._model = null;
    this._session = null;
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
    var event = new CustomEvent('pie', {
      bubbles: true,
      detail: {
        type: 'sessionChanged',
        component: this.tagName.toLowerCase()
      }
    });

    this.dispatchEvent(event);
  };

  _rerender() {
    if (this._model && this._session) {
      var element = React.createElement(Main,
        {
          model: this._model,
          session: this._session,
          onChange: this._onChange.bind(this)
        });
      ReactDOM.render(element, this, function () {
        console.log('rendered');
      });
    } else {
      console.log('skip');
    }
  }

  connectedCallback() {
    this.dispatchEvent(new CustomEvent('pie.register', { bubbles: true }));

    let strikeThrough = {
      name: 'strikethrough',
      observable: (o) => {
        o.onUpdate((newValue) => {
          this._model.strikeThroughEnabled = newValue;
          this._rerender();
        });
      }
    };

    this.dispatchEvent(new CustomEvent('toolbar-contribution', {
      bubbles: true,
      detail: {
        capabilities: [
          strikeThrough
        ]
      }
    }));

    this._rerender();
  }

}