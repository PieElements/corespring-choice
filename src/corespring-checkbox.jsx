import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {amber600} from 'material-ui/styles/colors';

import CorespringFeedbackTick from './corespring-feedback-tick.jsx';
import CorespringFeedback from './corespring-feedback.jsx';

export default class CorespringCheckbox extends React.Component {

  onCheck(el) {
    this.props.onChange({
      value: this.props.value, 
      selected: el.target.checked
    });
  }

  _checked() {
    return (this.props.correct !== undefined) ? this.props.correct : this.props.checked;
  }

  getTheme() {
    if(this.props.correctness === 'correct'){
      return getMuiTheme({
        checkbox: {
          disabledColor: "green"
        }
      });
    } else if(this.props.correctness === 'incorrect'){
      return getMuiTheme({
        checkbox: {
          disabledColor: amber600
        }
      });
    } else {
      return getMuiTheme();
    }
  }

  render() {
    const muiTheme = this.getTheme();

    return <div className="corespring-checkbox">
        <CorespringFeedbackTick correctness={this.props.correctness} />
        <div className="checkbox-holder">
          <MuiThemeProvider muiTheme={muiTheme}>
            <Checkbox
              disabled={this.props.disabled}
              checked={this._checked.bind(this)()}
              onCheck={this.onCheck.bind(this)}
              label={this.props['display-key'] + '. ' + this.props.label} />
          </MuiThemeProvider>
        </div>
        <CorespringFeedback feedback={this.props.feedback} correctness={this.props.correctness} />
      </div>
  }
};

CorespringCheckbox.propTypes = {
  'display-key': React.PropTypes.string,
  checked: React.PropTypes.bool,
  correct: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  feedback: React.PropTypes.string,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func,
  value: React.PropTypes.string
};

