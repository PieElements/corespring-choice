import React, { PropTypes } from 'react';
import CorespringCorrectAnswerToggle from 'corespring-correct-answer-toggle';
import ChoiceInput from './choice-input.jsx';

export default class CorespringChoice extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showCorrect: false,
      update: 0
    }

    /**
     * Note: component handlers are defined below using => 
     * to ensure the function context is correct.
     */

    this.onToggle = () => {
      if (this.props.mode === 'evaluate') {
        this.setState({ showCorrect: !this.state.showCorrect });
      }
    };

    this.onChange = (options) => {
      this.props.session.value = this.props.session.value || [];

      if (this.props.onChange) {
        this.props.onChange(options);
      }

      var value = options.value;
      var selected = options.selected;
      var index = this.props.session.value.indexOf(value);

      if (selected === undefined) {
        this.props.session.value = [value];
      } else {
        if (selected && index < 0) {
          if (this.props.choiceMode === 'radio') {
            this.props.session.value.pop();
          }
          this.props.session.value.push(value);
        } else if (!selected && index >= 0) {
          this.props.session.value.splice(index, 1);
        }
      }
      //TODO: We shouldn't be calling this, should we be moving the session props into state and calling setState instead?
      this.forceUpdate();
    }
  }

  isChecked(value) {
    if (this.props.session.value) {
      return this.props.session.value.indexOf(value) >= 0;
    } else {
      return false;
    }
  }

  _correctness(choice) {
    var outcome, response;
    //TODO: this looks to be unecessarily complex - we should derive correctnes from one source.
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
    var response;
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

  _indexToSymbol(index) {
    return ((this.props.keyMode === 'numbers') ? index + 1 : String.fromCharCode(97 + index).toUpperCase()).toString();
  }

  render() {

    if (this.props.mode !== 'evaluate') {
      this.state.showCorrect = false;
    }
    let strikeThroughEnabled = this.props.strikeThroughEnabled && this.props.mode === 'gather';


    let disabled = this.props.mode !== 'gather';

    const onStrikedOut = (choice, strikedOut) => { }

    let choiceToTag = (choice, index) => {
      var choiceClass = 'choice' + (index === this.props.choices.length - 1 ? ' last' : '');

      return <div className={choiceClass} key={index}>
        <ChoiceInput
          choiceMode={this.props.choiceMode}
          checked={this.isChecked(choice.value)}
          correct={this._correct(choice)}
          correctness={this._correctness(choice)}
          disabled={disabled}
          display-key={this._indexToSymbol(index)}
          feedback={this._feedback(choice)}
          label={choice.label}
          onChange={this.onChange}
          value={choice.value}
          strikeThroughEnabled={strikeThroughEnabled}
          onStrikedOut={onStrikedOut.bind(this, choice)} />
      </div>;
    };

    const showToggle = this.props.correctResponse;

    console.log('showToggle: ', showToggle);

    return <div className="corespring-choice">
      <CorespringCorrectAnswerToggle
        show={showToggle}
        initialValue={this.state.showCorrect}
        onToggle={this.onToggle.bind(this)} />
      <div className="prompt">{this.props.prompt}</div>
      {this.props.choices.map(choiceToTag)}
    </div>;
  }
}

CorespringChoice.propTypes = {
  mode: PropTypes.oneOf(['gather', 'view', 'evaluate']),
  choiceMode: PropTypes.oneOf(['radio', 'checkbox']),
  keyMode: PropTypes.oneOf(['numbers', 'letters']),
  model: PropTypes.object,
  outcomes: PropTypes.array,
  correctResponse: PropTypes.array,
  choices: PropTypes.array,
  prompt: PropTypes.string,
  session: PropTypes.object
};

CorespringChoice.defaultProps = {
  session: {
    value: []
  }
};
