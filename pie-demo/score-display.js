export default class ScoreDisplay extends HTMLElement {

  constructor() {
    super();
    this._score = null; //{maxPoints, points, percentage};
  }

  set score(s) {
    console.log('score', s);
    this._score = s;
    this._rerender();
  }

  _rerender() {
    if (this._score) {
      let shadow = this.createShadowRoot();
      let div = document.createElement('div');
      let s = this._score;
      div.innerText = `Score: ${s.percentage}% - points: ${s.points}/${s.maxPoints}`;
      shadow.appendChild(div);
    } else {
      console.log('skip');
    }
  }

  createdCallback() {
    this._rerender();
  }

}