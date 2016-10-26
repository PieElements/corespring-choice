import React from 'react';
import CorespringShowCorrectAnswerToggle from 'corespring-show-correct-answer-toggle-react';
import CorespringRadioButton from './corespring-radio-button.jsx';
import CorespringCheckbox from './corespring-checkbox.jsx';

export default class CorespringMultipleChoiceReact extends React.Component {

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
    
    this.toggle = () => {
      if(this.props.mode === 'evaluate'){
        this.setState({showCorrect: !this.state.showCorrect});
      }
    };
    
    this.onChange = (options) => {
      this.props.session.value = this.props.session.value || [];

      if(this.props.onChange){
        this.props.onChange(options);
      }

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
          if(this.props.choiceMode === 'radio') {
            this.props.session.value.pop();
          }
          this.props.session.value.push(value);
        } else if (!selected && index >= 0) {
          this.props.session.value.splice(index, 1);
        }
      }

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
    
    if(this.props.mode !== 'evaluate'){
      this.state.showCorrect = false;
    }
    
    let disabled = this.props.mode !== 'gather';

    const ChoiceTag = (this.props.choiceMode === 'checkbox' ? CorespringCheckbox : CorespringRadioButton);

    let choiceToTag = (choice, index) => {
      var choiceClass = 'choice' + (index === this.props.choices.length - 1 ? ' last' : '');
      return <div className={choiceClass} key={index}>
         <ChoiceTag
           checked={this.isChecked(choice.value)}
           correct={this._correct(choice)}
           correctness={this._correctness(choice)}
           disabled={disabled}
           display-key={this._indexToSymbol(index)}
           feedback={this._feedback(choice)}
           label={choice.label}
           onChange={this.onChange}
           value={choice.value} />
      </div>;
    };
    
    return <div className="corespring-multiple-choice-react">
       <CorespringShowCorrectAnswerToggle 
         show={!!this.props.correctResponse} 
         onClick={this.toggle} 
         toggle={this.state.showCorrect}/>
       <div className="prompt">{this.props.prompt}</div>
       {this.props.choices.map(choiceToTag)}
    </div>;
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
