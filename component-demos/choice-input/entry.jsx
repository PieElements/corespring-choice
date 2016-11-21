import React from 'react';
import ReactDOM from 'react-dom';
import ChoiceInput from '../../src/choice-input';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
let wrap = (props) => {

  return <MuiThemeProvider>
    <ChoiceInput
      choiceMode={props.choiceMode}
      display-key={'1'}
      checked={props.checked}
      correct={props.correct}
      correctness={props.correctness}
      disabled={props.disabled}
      feedback={props.feedback}
      label={props.label}
      onChange={props.onChange}
      value={props.value}
      strikeThroughEnabled={props.strikeThroughEnabled}
      onStrikedOut={props.onStrikedOut}
      />
  </MuiThemeProvider>;
}

let render = (id, opts) => {
  let one = document.querySelector(id);
  let input = React.createElement(wrap, opts);
  ReactDOM.render(input, one);
}

document.addEventListener('DOMContentLoaded', () => {

  render('#one', {
    label: 'this is a label',
    strikeThroughEnabled: true,
    onChange: () => console.log('onChange'),
    onStrikedOut: () => console.log('onStrikedOut')
  });

  render('#two', {
    label: 'this is a label',
    strikeThroughEnabled: false,
    onChange: () => console.log('onChange'),
    onStrikedOut: () => console.log('onStrikedOut')
  });

});