import React, {PropTypes} from 'react';
import Checkbox from 'material-ui/Checkbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {amber600, green500} from 'material-ui/styles/colors';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import muiThemeable from 'material-ui/styles/muiThemeable';
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';
import CorespringFeedbackTick from './corespring-feedback-tick.jsx';
import CorespringFeedback from './corespring-feedback.jsx';

export class CorespringCheckbox extends React.Component {

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
    let theme = cloneDeep(this.props.muiTheme);

    let disabledColor = theme.checkbox.disabledColor;
    if(this.props.correctness === 'correct'){
      theme.checkbox.disabledColor = theme.correctColor;
    } else if (this.props.correctness === 'incorrect'){
      theme.checkbox.disabledColor = theme.incorrectColor;
    }
    return theme;
  }
  
  render() {

    const muiTheme = this.getTheme();
   /**
    * TODO: should only really have 1 theme provider in the component tree.
    * but the way Checkbox is set up you can't tweak the styles via the props fully.
    * So have to use an additional MuiThemeProvider for now.
    */
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
  'display-key': PropTypes.string,
  checked: PropTypes.bool,
  correct: PropTypes.bool,
  disabled: PropTypes.bool,
  feedback: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
};


CorespringCheckbox.defaultProps = {
};

export default muiThemeable()(CorespringCheckbox);
