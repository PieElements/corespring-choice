# pie-player

## Html
### Custom Element <pie-player>  
Append the content to this element 

## Javascript

### Setter player.env 
The player view mode can be set via the env  

### Setter player.session
The various user inputs are collected in this object 

### Setter player.controller
The controller is used by the player to calculate model 
 changes and outcomes 

### Event 'pie-player-ready' 
bubbles=true  
Is dispatched, when the player is ready to receive values via its setters

### Event 'pie' with detail.type 'modelUpdated'
bubbles=false  
Is dipatched, whenever the player has seen an update to the model
 
### Event 'pie' with detail.type 'sessionChanged'
bubbles=true
Is dipatched, whenever the player has seen an update to the session

 
## Example usage 

```
import PiePlayer from 'pie-player';
document.registerElement('pie-player', PiePlayer);

import PieController from 'pie-client-side-controller';

import item from './item.json';
import controllerMap from 'babel?presets[]=es2015!webpack-generate-controllers!./item.json';
let controller = new PieController( item.components, controllerMap );

window.session = [];

document.addEventListener('DOMContentLoaded', function(){
  const env = {
    mode: 'gather'
  };

  player.addEventListener('pie-player-ready', function(event){
    let player = event.target;
    player.env = env;
    player.session = session;
    player.controller = controller;
  });

  player.addEventListener('pie', function(e){
    if(e.detail.type === 'modelUpdated') {
      //... 
    } else if(e.detail.type === 'sessionChanged') {
      //... 
    }
  });  
});

// in html use the custom element pie-player
<pie-player>
  <pie-multiple-choice data-id="1"></pie-multiple-choice>
</pie-player>

```