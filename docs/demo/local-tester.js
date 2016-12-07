export default class LocalTester extends HTMLElement {

  constructor() {
    super();
    let sr = this.attachShadow({ mode: 'open' });
    sr.innerHTML = `
    <style>
      :host{
        display: block;
        background-color: mistyrose;
      }
    </style>
    <div>
      <label id="label">TESTER</label>
      <slot></slot>
    </div> 
    `;
  }

  set model(m) {
    this._model = m;
    this.shadowRoot.querySelector('#label').textContent = m.title;
  }
}