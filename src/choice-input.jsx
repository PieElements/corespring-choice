import React, { PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';
import RadioButton from 'material-ui/RadioButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiThemeable from 'material-ui/styles/muiThemeable';
import cloneDeep from 'lodash/cloneDeep';
import FeedbackTick from './feedback-tick.jsx';
import Feedback from './feedback.jsx';

export class ChoiceInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      strikeThroughEnabled: this.props.strikeThroughEnabled || false,
      strikedOut: this.props.strikedOut
    }
  }

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
    if (this.props.correctness === 'correct') {
      theme.checkbox.disabledColor = theme.correctColor;
    } else if (this.props.correctness === 'incorrect') {
      theme.checkbox.disabledColor = theme.incorrectColor;
    }
    return theme;
  }

  componentWillReceiveProps(next) {
    this.setState({
      strikeThroughEnabled: next.strikeThroughEnabled
    });
  }

  render() {

    const muiTheme = this.getTheme();
    const Tag = this.props.choiceMode === 'checkbox' ? Checkbox : RadioButton;
    const classSuffix = this.props.choiceMode === 'checkbox' ? 'checkbox' : 'radio-button';
    /**
     * TODO: should only really have 1 theme provider in the component tree.
     * but the way Checkbox is set up you can't tweak the styles via the props fully.
     * So have to use an additional MuiThemeProvider for now.
     */

    const labelStyle = this.state.strikedOut ? {
      textDecoration: 'line-through'
    } : {};

    const onTagClick = (el) => {
      if (this.state.strikeThroughEnabled) {
        this.setState({ strikedOut: !this.state.strikedOut }, () => {
          this.props.onStrikedOut(this.state.strikedOut);
        });
      } else {
        this.onCheck(el);
      }
    }

    const label = <span 
      //need to do this for the demo - to bootstrap doesn't set it .. maybe shadow dom is the better option?
      style={{fontWeight: 'normal'}} 
      dangerouslySetInnerHTML={{ __html: `${this.props['display-key']}. ${this.props.label}` }}></span>;

    return <div className={"corespring-" + classSuffix}>
      <table>
        <tbody>
          <tr>
            <td>
              <FeedbackTick correctness={this.props.correctness} />
            </td>
            <td>
              <div className="checkbox-holder">
                <MuiThemeProvider muiTheme={muiTheme}>
                  <Tag
                    disabled={this.props.disabled}
                    checked={this._checked.bind(this)()}
                    onCheck={onTagClick}
                    labelStyle={labelStyle}
                    label={label} />
                </MuiThemeProvider>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Feedback feedback={this.props.feedback} correctness={this.props.correctness} />
    </div>
  }
};

ChoiceInput.propTypes = {
  choiceMode: React.PropTypes.oneOf(['radio', 'checkbox']),
  'display-key': React.PropTypes.string,
  choiceMode: PropTypes.string,
  checked: PropTypes.bool,
  correct: PropTypes.bool,
  correctness: PropTypes.string,
  disabled: PropTypes.bool,
  feedback: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  strikeThroughEnabled: PropTypes.bool,
  strikedOut: PropTypes.bool
};


ChoiceInput.defaultProps = {
  strikeThroughEnabled: false,
  strikedOut: false
};

export default muiThemeable()(ChoiceInput);
