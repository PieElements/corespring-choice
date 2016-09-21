
export default class PiePlayer extends HTMLElement{

  createdCallback(){
    console.log('created');
  }
  
  attachedCallback(){
    console.log('attached');
    let event = new CustomEvent('pie-player-ready', {bubbles: true});
    this.dispatchEvent(event);
  }

  set controllers(c){
   this._controllers = c; 
   this._update();
  }

  set env(e){
    this._env = e;
    this._update();
  }

  set session(s){
   this._session = s; 
   this._update();
  }

  _update(){
    if(this._controllers && this._env && this._session){
      this._controllers.model({}, this._session, this._env)
        .then((models) => {
          console.log('got models...');
        })
    }
  }
}