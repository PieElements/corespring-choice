var CorespringChoiceButton = React.createClass({displayName: 'CorespringChoiceButton',
  render: function() {
    return (
      <label className="corespring-choice-button">
        <input type={this.props.mode} name="group"></input>
        <span>{this.props['display-key']}. </span>
        <span>{this.props.label}</span>
      </label>
    );
  }
});

var CorespringMultipleChoice = React.createClass({
  displayName: 'CorespringMultipleChoice',
  propTypes: {
    prompt: React.PropTypes.string.isRequired,
    choiceMode: React.PropTypes.oneOf(['radio', 'checkbox']).isRequired,
    keyMode: React.PropTypes.oneOf(['numbers', 'letters']).isRequired
  },

  _indexToSymbol(index) {
    return (this.props.keyMode === 'numbers') ? index + 1 : String.fromCharCode(97 + index).toUpperCase();
  },
  
  render: function() {
    var self = this;
    return (
      <div>
        <div className="prompt">{this.props.prompt}</div>
        <div>{
          this.props.choices.map(function(choice, index) {
            return <CorespringChoiceButton mode={self.props.choiceMode} label={choice.label} display-key={self._indexToSymbol(index)}/>;
          })
        }</div>
      </div>
    );
  }
});

// module.exports = CorespringMultipleChoice;

pie.framework('react').register('corespring-multiple-choice', CorespringMultipleChoice);