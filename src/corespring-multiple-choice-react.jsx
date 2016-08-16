import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';

var CorespringRadioButton = React.createClass({displayName: 'CorespringChoiceButton',
  onChange: function(el) {
    this.props.onChange(el.target.value);
    //el.target.value;
  },
  render: function() {
    return (
      <label className="corespring-choice-button">
        <input type="radio" name={this.props['component-id']} value={this.props.value} onChange={this.onChange}></input>
        <span>{this.props['display-key']}. </span>
        <span>{this.props.label}</span>
      </label>
    );
  }
});

var CorespringMultipleChoiceReact = React.createClass({
  displayName: 'CorespringMultipleChoiceReact',
  getDefaultProps: function() {
    return {
      session: {
        value: []
      }
    };
  },
  propTypes: {
    prompt: React.PropTypes.string.isRequired,
    choiceMode: React.PropTypes.oneOf(['radio', 'checkbox']).isRequired,
    keyMode: React.PropTypes.oneOf(['numbers', 'letters']).isRequired,
    session: React.PropTypes.object
  },
  onChange: function(value) {
    // set the parent session value.
    this.props.session.value = [value];
    console.log('session', this.props.session);
  },
  _indexToSymbol(index) {
    return (this.props.keyMode === 'numbers') ? index + 1 : String.fromCharCode(97 + index).toUpperCase();
  },
  
  render: function() {
    var self = this;
    var componentId = "replace-me";
    return (
      <div>
        <div className="prompt">{this.props.prompt}</div>
        <div>{
          this.props.choices.map(function(choice, index) {
            return <CorespringRadioButton onChange={self.onChange} value={choice.value} label={choice.label} key={index} component-id={componentId} display-key={self._indexToSymbol(index)}/>;
          })
        }</div>
      </div>
    );
  }
});

module.exports = CorespringMultipleChoiceReact;
