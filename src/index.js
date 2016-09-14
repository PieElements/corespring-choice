import Main from './main.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

var style = require('!style!css!less!./index.less');

export default class CorespringMultiplechoiceReact extends HTMLElement{

  constructor(){
    super();
    this._model = null;
    this._session = null;
  }

  get model(){
    return this._model;
  }
  
  set model(s){
    this._model = s;
    this._rerender();
  }

  get session(){
    return this._session;
  }
  
  set session(s){
    this._session = s;
    this._rerender();
  }

  _rerender() {
    console.log('_rerender...');
    if (this._model && this._session) {
      var element = React.createElement(Main, { model: this._model, session: this._session });
      ReactDOM.render(element, this, function () {
        console.log('rendered');
      });
    } else {
      console.log('skip');
    }
  }

  createdCallback() {
    console.log('created');
    this._rerender();
  }

  attachedCallback(){
    console.log('attached');
    this.innerHTML = '!!!';
  }

}