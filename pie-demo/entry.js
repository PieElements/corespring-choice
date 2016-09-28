import PiePlayer from 'pie-player';
document.registerElement('pie-player', PiePlayer);

import PieControlPanel from 'pie-control-panel';
document.registerElement('pie-control-panel', PieControlPanel);

import CorespringMultipleChoiceReact from '../src/index';
document.registerElement('corespring-multiple-choice-react', CorespringMultipleChoiceReact);

import ClientSideController from 'pie-client-side-controller';

import ScoringProcessor from 'pie-default-scoring-processor';
const scoringProcessor = new ScoringProcessor();

import item from './item.json';

import controllerMap from 'babel?presets[]=es2015!webpack-generate-controllers!./item.json';


const controller = new ClientSideController( item.components, controllerMap );

window.session = [];

document.addEventListener('DOMContentLoaded', function(){

  const controlPanel = document.querySelector('pie-control-panel');
  const player = document.querySelector('pie-player');
  const env = {
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
    const p = Object.getPrototypeOf(event.target);
    const d = Object.getOwnPropertyDescriptor(p, 'env');
    console.log('d:', d);
    event.target.env = env;
    event.target.session = window.session;
    event.target.controller = controller;
  });

  player.addEventListener('pie', function(e){
    console.log('pie event', e);
    if(e.detail.type === 'modelUpdated') {
      var model = e.detail.model;
      //todo the controller needs a outcome method
      let score = scoringProcessor.score(item, window.session, model);
      console.log(score);
    }
  });
});