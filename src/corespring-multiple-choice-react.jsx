import React from 'react';

import CorespringShowCorrectAnswerToggle from './corespring-show-correct-answer-toggle.jsx';
import CorespringRadioButton from './corespring-radio-button.jsx';
import CorespringCheckbox from './corespring-checkbox.jsx';

class CorespringMultipleChoiceReact extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showCorrect: false
    }
  }

  toggle() {
    this.setState({showCorrect: !this.state.showCorrect});
  }

  onChange(options) {
    console.log('onChange', options, this.props, this)
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
  }

  isChecked(value) {
    if (this.props.session.value) {
      return this.props.session.value.indexOf(value) >= 0;
    } else {
      return false;
    }
  }

  _indexToSymbol(index) {
    return ((this.props.keyMode === 'numbers') ? index + 1 : String.fromCharCode(97 + index).toUpperCase()).toString();
  }

  _correctness(choice) {
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
  }

  _correct(choice) {
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
  }

  _feedback(choice) {
    if (this.props.outcomes && !this.state.showCorrect) {
      var outcome;
      for (var i in this.props.outcomes) {
        outcome = this.props.outcomes[i];
        if (outcome.value === choice.value) {
          return outcome.feedback;
        }
      }
    }
  }

  disabled() {
    return this.props.mode !== 'gather';
  }

  render() {
    var self = this;
    var componentId = "replace-me";

    return (
      <div className="corespring-multiple-choice-react">
        <CorespringShowCorrectAnswerToggle show={!!self.props.correctResponse} onClick={self.toggle.bind(self)} toggle={self.state.showCorrect}/>
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
                          checked={self.isChecked(choice.value)}
                          component-id={componentId}
                          correct={self._correct(choice)}
                          correctness={self._correctness(choice)}
                          disabled={self.disabled()}
                          display-key={self._indexToSymbol(index)}
                          feedback={self._feedback(choice)}
                          label={choice.label}
                          onChange={self.onChange.bind(self)}
                          value={choice.value}
                      />
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
                          checked={self.isChecked(choice.value)}
                          component-id={componentId}
                          correct={self._correct(choice)}
                          correctness={self._correctness(choice)}
                          disabled={self.disabled()}
                          display-key={self._indexToSymbol(index)}
                          feedback={self._feedback(choice)}
                          label={choice.label}
                          onChange={self.onChange.bind(self)}
                          value={choice.value}
                      />
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
}

CorespringMultipleChoiceReact.propTypes = {
  choiceMode: React.PropTypes.oneOf(['radio', 'checkbox']),
  keyMode: React.PropTypes.oneOf(['numbers', 'letters']),
  model: React.PropTypes.object,
  outcomes: React.PropTypes.array,
  prompt: React.PropTypes.string,
  session: React.PropTypes.object
};

CorespringMultipleChoiceReact.defaultProps = {
  session: {
    value: []
  }
};


export default CorespringMultipleChoiceReact;
