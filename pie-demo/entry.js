import PiePlayer from '../src/pie-player';
document.registerElement('pie-player', PiePlayer);

import PieControlPanel from '../src/pie-control-panel';
document.registerElement('pie-control-panel', PieControlPanel);

import CorespringMultipleChoiceReact from '../src/index';
document.registerElement('corespring-multiple-choice-react', CorespringMultipleChoiceReact);

import controller from '../controller';
import PieControllers from '../src/client-side-pie-controllers';

import model from './demo-data';

const controllerMap = {
  'corespring-multiple-choice-react' : controller
};

const controllers = new PieControllers( model, controllerMap );

window.session = [];

document.addEventListener('DOMContentLoaded', function(){

  var controlPanel = document.querySelector('pie-control-panel');
  var player = document.querySelector('pie-player');
  var env = {
    mode: 'gather'
  };

  if(controlPanel){
    controlPanel.env = env;
  }

  player.addEventListener('pie-player-ready', function(event){

    //Dont init this listener untile the player has been upgraded 
    controlPanel.addEventListener('envChanged', (event) => {
      player.env = event.target.env;
    });

    console.log('got pie-player-ready');
    let p = Object.getPrototypeOf(event.target);
    let d = Object.getOwnPropertyDescriptor(p, 'env');
    console.log('d:', d);
    event.target.env = env;
    event.target.session = window.session;
    event.target.controllers = controllers;
  });
});