import PiePlayer from 'pie-player';
document.registerElement('pie-player', PiePlayer);

import PieControlPanel from 'pie-control-panel';
document.registerElement('pie-control-panel', PieControlPanel);

import CorespringMultipleChoiceReact from '../src/index';
document.registerElement('corespring-multiple-choice-react', CorespringMultipleChoiceReact);

import ClientSideController from 'pie-client-side-controller';

import item from './item.json';

import controllerMap from 'babel?presets[]=es2015!webpack-custom!./item.json';

const controller = new ClientSideController( item.components, controllerMap );

window.session = [];

document.addEventListener('DOMContentLoaded', function(){

  var controlPanel = document.querySelector('pie-control-panel');
  var player = document.querySelector('pie-player');
  var env = {
    mode: 'gather'
  };


  player.addEventListener('pie-player-ready', function(event){

    if(controlPanel){
      controlPanel.env = env;
    }
    //Dont init this listener until the player has been upgraded 
    controlPanel.addEventListener('envChanged', (event) => {
      player.env = event.target.env;
    });

    console.log('got pie-player-ready');
    let p = Object.getPrototypeOf(event.target);
    let d = Object.getOwnPropertyDescriptor(p, 'env');
    console.log('d:', d);
    event.target.env = env;
    event.target.session = window.session;
    event.target.controller = controller;
  });
});