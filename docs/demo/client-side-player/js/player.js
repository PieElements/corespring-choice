
document.addEventListener('pie', pieEventListener);

function pieEventListener(evt){
  console.log('pie event', evt.target.dataset.id, evt.detail.type, evt);
  if(evt.detail.type === 'register') {
    registerComponent(evt.target.dataset.id);
  }
}

function registerComponent(compId){
  console.log('registerComponent', compId);
  var comp = _.find(item.components, {id: compId});
  if(comp) {
    var el = document.querySelector('[data-id="' + comp.id + '"]');
    el.model = getModel(comp, 'gather');
    el.session = {value:[]};
  }
}

function getModel(comp, viewMode){
  var model = controllers[comp.component.name](comp, getSession(comp.id), {mode: viewMode || 'gather'});
  return model;
}

function getSession(compId){
  var el = document.querySelector('[data-id="' + compId + '"]');
  return el.session;
}

function setMode(viewMode){
  for(var i in item.components){
    var comp = item.components[i];
    var el = document.querySelector('[data-id="' + comp.id + '"]');
    el.model = getModel(comp, viewMode);
  }
}

