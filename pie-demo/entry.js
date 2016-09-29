import PiePlayer from 'pie-player';
document.registerElement('pie-player', PiePlayer);

import PieControlPanel from 'pie-control-panel';
document.registerElement('pie-control-panel', PieControlPanel);

import ScoreDisplay from './score-display.js';
document.registerElement('score-display', ScoreDisplay);


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
  const scoreDisplay = document.querySelector('score-display');
  const env = {
    mode: 'gather'
  };

  //add an element via code
  let el = document.createElement('corespring-multiple-choice-react');
  el.setAttribute('data-id', '2')
  console.log("el", el)
  player.appendChild(el)

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
    console.log('Pie event: ', e.detail.type);
    if(e.detail.type === 'modelUpdated') {
      const ids = item.components.map(c => c.id);
      controller.outcome(ids, window.session, env).then(function(outcomes){
        let weightedScore = scoringProcessor.score(item, window.session, outcomes);
        console.log("outcome", weightedScore);
        scoreDisplay.score = weightedScore.summary;
      });
    } else if(e.detail.type === 'sessionChanged') {
      console.log("session", session);
    }
  });
});