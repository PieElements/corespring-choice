import Checkbox from 'material-ui/Checkbox';

var CorespringFeedbackTick = require('./corespring-feedback-tick');
var CorespringFeedback = require('./corespring-feedback');

module.exports = React.createClass({displayName: 'CorespringCheckbox',
  getInitialState: function() {
    return {
      userValue: false,
      checked: false
    };
  },

  onCheck: function(el) {
    var self = this;
    this.props.onChange({
      value: this.props.value, 
      selected: el.target.checked
    });
    this.setState({userValue: !this.state.checked});
    this.setState({checked: !this.state.checked});
  },

  _checked: function() {
    return (this.props.correct !== undefined) ? this.props.correct : this.state.checked;
  },

  render: function() {
    var self = this;
    return (
      <div className="corespring-checkbox">
        <CorespringFeedbackTick correctness={self.props.correctness} />
        <div className="checkbox-holder">
          <Checkbox
            disabled={self.props.disabled}
            checked={self._checked()}
            onCheck={self.onCheck}
            label={this.props['display-key'] + '. ' + this.props.label} />
        </div>
        <CorespringFeedback feedback={self.props.feedback} correctness={self.props.correctness} />
      </div>
    );
  }
});