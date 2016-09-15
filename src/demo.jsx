import Main from './main.jsx';
import React from 'react';
import {render} from 'react-dom';
import _ from 'lodash';

var model = {
  choiceMode: "radio",
  prompt: "Multiple Choice",
  mode: "gather",
  choices: [
    {
      label: "Section A",
      value: "a"
    },
    {
      label: "Section B",
      value: "b"
    },
  ]

};

var session = {
  value: [
    "b"
  ]
};

var modelWithSession = _.extend(_.cloneDeep(model), {
  prompt: 'with Session'
});

var modelWithOutcomes = _.extend(_.cloneDeep(model), {
  prompt: 'with Session & Outcomes',
  mode: "evaluate",
  outcomes: [true, false]
});

var modelWithOutcomesAndCorrectResponse = _.extend(_.cloneDeep(modelWithOutcomes), {
  prompt: 'with Session,  Outcomes and Correct Response',
  correctResponse: ["a"]
});

render(
  <div>
    <Main model={model} />
    <Main model={modelWithSession} session={session}/>
    <Main model={modelWithOutcomes}  session={session}/>
    <Main model={modelWithOutcomesAndCorrectResponse}  session={session}/>
  </div>
  , document.getElementById('app')
);