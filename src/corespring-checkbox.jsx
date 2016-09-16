import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {amber600} from 'material-ui/styles/colors';

import CorespringFeedbackTick from './corespring-feedback-tick.jsx';
import CorespringFeedback from './corespring-feedback.jsx';

class CorespringCheckbox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userValue: false,
      checked: props.checked
    };
  }

  onCheck(el) {
    this.props.onChange({
      value: this.props.value, 
      selected: el.target.checked
    });
    this.setState({userValue: !this.state.checked});
    this.setState({checked: !this.state.checked});
  }

  _checked() {
    return (this.props.correct !== undefined) ? this.props.correct : this.state.checked;
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
    const self = this;
    const muiTheme = self.getTheme();

    return (
      <div className="corespring-checkbox">
        <CorespringFeedbackTick correctness={self.props.correctness} />
        <div className="checkbox-holder">
          <MuiThemeProvider muiTheme={muiTheme}>
            <Checkbox
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

CorespringCheckbox.propTypes = {
  'display-key': React.PropTypes.string,
  checked: React.PropTypes.bool,
  correct: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  feedback: React.PropTypes.string,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func,
  value: React.PropTypes.string
}

export default CorespringCheckbox