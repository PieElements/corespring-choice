import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';

var CorespringRadioButton = React.createClass({displayName: 'CorespringChoiceButton',
  onChange: function(el) {
    this.props.onChange({
      value: el.target.value, 
      selected: true
    });
  },
  render: function() {
    return (
      <div></div>
    );
  }
});

var CorespringCheckbox = React.createClass({displayName: 'CorespringCheckbox',
  onChange: function(el) {
    this.props.onChange({
      value: this.props.value, 
      selected: el.target.checked
    });
  },
  render: function() {
    return (
      <Checkbox
        label={this.props['display-key'] + '. ' + this.props.label} />
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
  onChange: function(options) {
    this.props.session.value = this.props.session.value || [];

    var value = options.value;
    var selected = options.selected;
    var index = this.props.session.value.indexOf(value);

    if (selected && index < 0) {
      this.props.session.value.push(value);
    } else if (!selected && index >= 0) {
      this.props.session.value.splice(index, 1);
    }
  },
  _indexToSymbol(index) {
    return (this.props.keyMode === 'numbers') ? index + 1 : String.fromCharCode(97 + index).toUpperCase();
  },
  
  render: function() {
    var self = this;
    console.log('this.props', this.props);
    var componentId = "replace-me";
    return (
      <div>
        <div className="prompt">{this.props.prompt}</div>
        <div>{
          this.props.choices.map(function(choice, index) {
            return <CorespringCheckbox onChange={self.onChange} label={choice.label} key={index} value={choice.value} component-id={componentId} display-key={self._indexToSymbol(index)}/>;
          })
        }</div>
      </div>
    );
  }
});

module.exports = CorespringMultipleChoiceReact;
