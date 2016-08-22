var CorespringShowCorrectAnswerToggle = require('./corespring-show-correct-answer-toggle');
var CorespringRadioButton = require('./corespring-radio-button');
var CorespringCheckbox = require('./corespring-checkbox');

module.exports = React.createClass({
  displayName: 'CorespringMultipleChoiceReact',

  getDefaultProps: function() {
    return {
      session: {
        value: []
      }
    };
  },
  
  getInitialState: function() {
    return {
      showCorrect: false
    };
  },
  
  propTypes: {
    prompt: React.PropTypes.string.isRequired,
    choiceMode: React.PropTypes.oneOf(['radio', 'checkbox']).isRequired,
    keyMode: React.PropTypes.oneOf(['numbers', 'letters']).isRequired,
    outcomes: React.PropTypes.array,
    session: React.PropTypes.object
  },
  
  toggle: function() {
    this.setState({showCorrect: !this.state.showCorrect});
  },

  onChange: function(options) {
    this.props.session.value = this.props.session.value || [];

    var value = options.value;
    var selected = options.selected;
    var index = this.props.session.value.indexOf(value);

    if (selected === undefined) {
      for (var i in this.refs) {
        if (this.refs[i].selectionChanged) {
          this.refs[i].selectionChanged(value);
        }
      }
      this.props.session.value = [value];
    } else {
      if (selected && index < 0) {
        this.props.session.value.push(value);
      } else if (!selected && index >= 0) {
        this.props.session.value.splice(index, 1);
      }
    }
  },

  isChecked: function(value) {
    if (this.props.session.value) {
      return this.props.session.value.indexOf(value) >= 0;
    } else {
      return false;
    }
  },
  
  _indexToSymbol: function(index) {
    return (this.props.keyMode === 'numbers') ? index + 1 : String.fromCharCode(97 + index).toUpperCase();
  },

  _correctness: function(choice) {
    var outcome, response;
    if (this.state.showCorrect && this.props.correctResponse) {
      for (var i in this.props.correctResponse) {
        response = this.props.correctResponse[i];
        if (response === choice.value) {
          return 'correct';
        }
      }
    } else if (this.props.outcomes) {
      for (var i in this.props.outcomes) {
        outcome = this.props.outcomes[i];
        if (outcome.value === choice.value) {
          return outcome.correct ? 'correct' : 'incorrect';
        }
      }
    }
  },

  _correct: function(choice) {
    var outcome, response;
    if (this.state.showCorrect && this.props.correctResponse) {
      for (var i in this.props.correctResponse) {
        response = this.props.correctResponse[i];
        if (response === choice.value) {
          return true;
        }
      }
      return false;
    } else {
      return undefined;
    }
  },

  _feedback: function(choice) {
    if (this.props.outcomes && !this.state.showCorrect) {
      var outcome;
      for (var i in this.props.outcomes) {
        outcome = this.props.outcomes[i];
        if (outcome.value === choice.value) {
          return outcome.feedback;
        }
      } 
    }
  },

  disabled: function() {
    return this.props.mode !== 'gather';
  },

  render: function() {
    var self = this;
    var componentId = "replace-me";
    
    return (
      <div className="corespring-multiple-choice-react">
        <CorespringShowCorrectAnswerToggle show={self.props.outcomes.length !== 0} onClick={self.toggle} toggle={self.state.showCorrect}/>
        <div className="prompt">{this.props.prompt}</div>
        <div>{
          (function() {
            if (self.props.choiceMode === 'checkbox') {
              return (
                self.props.choices.map(function(choice, index) {
                  var choiceClass = "choice" + (index === self.props.choices.length - 1 ? ' last' : '');
                  return (
                    <div className={choiceClass} key={index}>
                      <CorespringCheckbox
                          disabled={self.disabled()}
                          onChange={self.onChange}
                          correct={self._correct(choice)}
                          correctness={self._correctness(choice)}
                          feedback={self._feedback(choice)}
                          label={choice.label}
                          value={choice.value}
                          component-id={componentId}
                          display-key={self._indexToSymbol(index)} />
                    </div>
                  );
                })
              );
            } else {
              return (
                self.props.choices.map(function(choice, index) {
                  var choiceClass = "choice" + (index === self.props.choices.length - 1 ? ' last' : '');
                  var ref = "choice-" + index;
                  return (
                    <div className={choiceClass} key={index}>
                      <CorespringRadioButton
                          ref={ref}
                          disabled={self.disabled()}
                          onChange={self.onChange}
                          correct={self._correct(choice)}
                          correctness={self._correctness(choice)}
                          feedback={self._feedback(choice)}
                          label={choice.label}
                          value={choice.value}
                          component-id={componentId}
                          display-key={self._indexToSymbol(index)} />
                    </div>
                  );
                })
              );
            }
          })()  
        }</div>
      </div>
    );
  }
});
