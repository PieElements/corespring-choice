import Main from './main.jsx';
import React from 'react';
import {render} from 'react-dom';
import _ from 'lodash';

var model = {
  prompt: "Pie Chart ",
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
  prompt: 'with Outcomes',
  outcomes: [true, false],
  disabled: true
});

var modelWithOutcomesAndCorrectResponse = _.extend(_.cloneDeep(modelWithOutcomes), {
  prompt: 'with Outcomes and Correct Response',
  correctResponse: ["a"]
});

render(
  <div>
    <Main model={model} />
    <Main model={modelWithSession} session={session}/>
    <Main model={modelWithOutcomes} />
    <Main model={modelWithOutcomesAndCorrectResponse} />
  </div>
  , document.getElementById('app')
);