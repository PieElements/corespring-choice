var CorespringChoiceButton = React.createClass({displayName: 'CorespringChoiceButton',
  onChange: function(el) {
    console.log('el.target', el.target);
  },
  render: function() {
    return (
      <label className="corespring-choice-button">
        <input type={this.props.mode} name="group" value={this.props['choice-id']} onChange={this.onChange}></input>
        <span>{this.props['display-key']}. </span>
        <span>{this.props.label}</span>
      </label>
    );
  }
});

var CorespringMultipleChoiceReact = React.createClass({
  displayName: 'CorespringMultipleChoiceReact',
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
            return <CorespringChoiceButton mode={self.props.choiceMode} choice-id={choice.id} label={choice.label} key={index} display-key={self._indexToSymbol(index)}/>;
          })
        }</div>
      </div>
    );
  }
});

module.exports = CorespringMultipleChoiceReact;
