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

var CorespringFeedbackTick = React.createClass({displayName: 'CorespringFeedbackTick',
  render: function() {
    var correctClass = "correct-icon" + (this.props.correctness === 'correct' ? '' : ' hide');
    var incorrectClass = "incorrect-icon" + (this.props.correctness === 'incorrect' ? '' : ' hide');

    return (
      <div className="feedback-tick">
        <svg
            className={incorrectClass}
            preserveAspectRatio="xMinYMin meet" x="0px" y="0px" viewBox="0 0 44 40" style={{"enableBackground": "new 0 0 44 40"}}>
          <g>
            <rect x="11" y="17.3" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -7.852 19.2507)" className="incorrect-background" width="16.6"
              height="3.7"></rect>
            <rect x="17.4" y="10.7" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -7.8175 19.209)" className="incorrect-background" width="3.7"
              height="16.6"></rect>
          </g>
        </svg>
        <svg 
            className={correctClass}
            preserveAspectRatio="xMinYMin meet" version="1.1" x="0px" y="0px" viewBox="0 0 44 40" style={{"enableBackground": "new 0 0 44 40"}}>
          <g>
            <g>
              <polygon className="correct-background" points="19.1,28.6 11.8,22.3 14.4,19.2 17.9,22.1 23.9,11.4 27.5,13.4"></polygon>
            </g>
          </g>
        </svg>
      </div>
    );
  }
});

var CorespringFeedback = React.createClass({displayName: 'CorepsringFeedback',
  render: function() {
    var self = this;
    var feedbackClass = "corespring-feedback " + this.props.correctness;
    if (self.props.correctness && self.props.feedback) {
      return <div className={feedbackClass}>{self.props.feedback}</div>
    } else {
      return <div></div>
    }
  }
});

var CorespringShowCorrectAnswerToggle = React.createClass({displayName: 'CorespringShowCorrectAnswerToggle',
  getDefaultProps: function() {
    return {
      showMessage: 'Show correct answer',
      hideMessage: 'Hide correct answer'
    };
  },
  onClick: function() {
    this.props.onClick();
  },
  render: function() {
    var self = this;
    return (
      <div>{
        (function() {
          if (self.props.show) {
            return (
              <div className="corespring-correct-answer-toggle" onClick={self.onClick}>
                <div className="svg-holder">{
                  (function() {
                    if (self.props.toggle) {
                      return (
                        <svg preserveAspectRatio="xMinYMin meet" viewBox="-283 359 34 35">
                          <circle className="hide-icon-background" cx="-266" cy="375.9" r="14"/>
                          <path className="hide-icon-background" d="M-280.5,375.9c0-8,6.5-14.5,14.5-14.5s14.5,6.5,14.5,14.5s-6.5,14.5-14.5,14.5S-280.5,383.9-280.5,375.9zM-279.5,375.9c0,7.4,6.1,13.5,13.5,13.5c7.4,0,13.5-6.1,13.5-13.5s-6.1-13.5-13.5-13.5C-273.4,362.4-279.5,368.5-279.5,375.9z"/>
                          <polygon className="hide-icon-foreground" points="-265.4,383.1 -258.6,377.2 -261.2,374.2 -264.3,376.9 -268.9,368.7 -272.4,370.6         "/>
                        </svg>
                      );
                    } else {
                      return (
                        <svg preserveAspectRatio="xMinYMin meet" viewBox="-129.5 127 34 35">
                          <path style={{fill: "#B3ABA4", "stroke" : "#CDC7C2", "strokeWidth" : 0.5, "strokeMiterlimit": 10}} d="M-113.2,159c-8,0-14.5-6.5-14.5-14.5s6.5-14.5,14.5-14.5s14.5,6.5,14.5,14.5S-105.2,159-113.2,159z"/>
                          <circle className="show-icon-background" cx="-114.2" cy="143.5" r="14"/>
                          <path className="show-icon-border" d="M-114.2,158c-8,0-14.5-6.5-14.5-14.5s6.5-14.5,14.5-14.5s14.5,6.5,14.5,14.5S-106.2,158-114.2,158zM-114.2,130c-7.4,0-13.5,6.1-13.5,13.5s6.1,13.5,13.5,13.5s13.5-6.1,13.5-13.5S-106.8,130-114.2,130z"/>
                          <polygon className="show-icon-foreground" points="-114.8,150.7 -121.6,144.8 -119,141.8 -115.9,144.5 -111.3,136.3 -107.8,138.2"/>
                        </svg>
                      );
                    }
                  }())
                }</div>
                <div className="label">{
                  (function() {
                    if (self.props.toggle) {
                      return self.props.hideMessage;
                    } else {
                      return self.props.showMessage;
                    }
                  })()
                }</div>
              </div>
            );
          }
        }())
      }</div>
    );
  }

});

var CorespringCheckbox = React.createClass({displayName: 'CorespringCheckbox',
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
            checked={self._checked()}
            onCheck={self.onCheck}
            label={this.props['display-key'] + '. ' + this.props.label} />
        </div>
        <CorespringFeedback feedback={self.props.feedback} correctness={self.props.correctness} />
      </div>
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

    if (selected && index < 0) {
      this.props.session.value.push(value);
    } else if (!selected && index >= 0) {
      this.props.session.value.splice(index, 1);
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
  
  render: function() {
    var self = this;
    var componentId = "replace-me";
    
    return (
      <div className="corespring-multiple-choice-react">
        <CorespringShowCorrectAnswerToggle show={self.props.outcomes.length !== 0} onClick={self.toggle} toggle={self.state.showCorrect}/>
        <div className="prompt">{this.props.prompt}</div>
        <div>{
          this.props.choices.map(function(choice, index) {
            var choiceClass = "choice" + (index === self.props.choices.length - 1 ? ' last' : '');
            return (
              <div className={choiceClass} key={index}>
                <CorespringCheckbox onChange={self.onChange} correct={self._correct(choice)} correctness={self._correctness(choice)} feedback={self._feedback(choice)} label={choice.label} value={choice.value} component-id={componentId} display-key={self._indexToSymbol(index)} />
              </div>
            )
          })
        }</div>
      </div>
    );
  }
});

module.exports = CorespringMultipleChoiceReact;
