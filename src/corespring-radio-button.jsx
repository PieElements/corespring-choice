import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {amber600} from 'material-ui/styles/colors';

import RadioButton from 'material-ui/RadioButton';

import CorespringFeedbackTick from './corespring-feedback-tick.jsx';
import CorespringFeedback from './corespring-feedback.jsx';

class CorespringRadioButton extends React.Component {

  onCheck(el) {
    this.props.onChange({
      value: this.props.value
    });
  }

  _checked() {
    return (this.props.correct !== undefined) ? this.props.correct : this.props.checked;
  }

  getTheme() {
    if(this.props.correctness === 'correct'){
      return getMuiTheme({
        radioButton: {
          disabledColor: "green"
        }
      });
    } else if(this.props.correctness === 'incorrect'){
      return getMuiTheme({
        radioButton: {
          disabledColor: amber600
        }
      });
    } else {
      return getMuiTheme();
    }
  }

  render() {
    const self = this;
    const muiTheme = self.getTheme();

    return (
      <div className="corespring-radio-button">
        <CorespringFeedbackTick correctness={self.props.correctness} />
        <div className="checkbox-holder">
          <MuiThemeProvider muiTheme={muiTheme}>
            <RadioButton
              name="test"
              disabled={self.props.disabled}
              checked={self._checked()}
              onCheck={self.onCheck.bind(self)}
              label={self.props['display-key'] + '. ' + self.props.label} />
            </MuiThemeProvider>
        </div>
        <CorespringFeedback feedback={self.props.feedback} correctness={self.props.correctness} />
      </div>
    );
  }
}

CorespringRadioButton.propTypes = {
  'display-key': React.PropTypes.string,
  checked: React.PropTypes.bool,
  correct: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  feedback: React.PropTypes.string,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func
}

export default CorespringRadioButton