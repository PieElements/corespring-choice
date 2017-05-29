export default class SampleElement extends HTMLElement {

  set model(m) {
    console.log('set model', m);
    this._model = m;
    this._render();
  }

  set session(s) {
    console.log('set session: ', s);
    this._session = s;
    this._render();
  }

  _render() {
    this.innerHTML = JSON.stringify({ model: this._model, session: this._session });
  }
}

