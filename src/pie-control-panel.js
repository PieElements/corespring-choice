let input = (key) => {
  return ` 
    <label>
      <input type="radio" name="mode" value="${key}"/>
    ${key}
    </label>`
};

let html = ` 
    <span>A tmp control panel</span>
    ${input('gather')}
    ${input('view')}
    ${input('evaluate')}
    <span> color contrast</span>
   <select name="colorContrast">
      <option value="black_on_white">black on white</option>
      <option value="white_on_black">white on black</option>
      <option value="black_on_rose">black on rose</option>
    </select>`;


export default class PieControlPanel extends HTMLElement{

  createdCallback(){
    this.innerHTML = html;
    this.emitEnvChangedEvent();
  }

  attachedCallback(){
    this.addChangeListener('gather');
    this.addChangeListener('view');
    this.addChangeListener('evaluate');

    var select = this.querySelector('select[name="colorContrast"]');
    select.addEventListener('change', (event) => {
      console.log('select changed', event);
      this.env.accessibility = this.env.accessibility || {};
      this.env.accessibility.colorContrast = event.target.value;
      this.emitEnvChangedEvent();
    });
  }

  set env(e){
    this._env = e;
  }

  onInputChange(key){
    return () => {
      this.env.mode = key;
      this.emitEnvChangedEvent();
    };
  }

  emitEnvChangedEvent() {
    var event = new CustomEvent('envChanged');
    this.dispatchEvent(event);
  }

  addChangeListener(key){
    var el = this.querySelector('input[value="'+key+'"]');
    if(!el){
      throw new Error('cant find input');
    }
    el.addEventListener('change', this.onInputChange(key));
  };

}