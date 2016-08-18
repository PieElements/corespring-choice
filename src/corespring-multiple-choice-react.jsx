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
    var self = this;
    return (
      <div className="feedback-tick">{
        (function() {
          if (self.props.correctness === 'incorrect') {
            return (
              <svg
                  className="incorrect-icon"
                  preserveAspectRatio="xMinYMin meet" x="0px" y="0px" viewBox="0 0 44 40" style={{"enableBackground": "new 0 0 44 40"}}>
                <g>
                  <rect x="11" y="17.3" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -7.852 19.2507)" className="incorrect-background" width="16.6"
                    height="3.7"></rect>
                  <rect x="17.4" y="10.7" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -7.8175 19.209)" className="incorrect-background" width="3.7"
                    height="16.6"></rect>
                </g>
              </svg>
            );
          } else if (self.props.correctness === 'correct') {
            return (
              <svg 
                  className="correct-icon"
                  preserveAspectRatio="xMinYMin meet" version="1.1" x="0px" y="0px" viewBox="0 0 44 40" style={{"enableBackground": "new 0 0 44 40"}}>
                <g>
                  <g>
                    <polygon className="correct-background" points="19.1,28.6 11.8,22.3 14.4,19.2 17.9,22.1 23.9,11.4 27.5,13.4"></polygon>
                  </g>
                </g>
              </svg>
            );
          }
        })()
      }</div>
    );
  }
});

var CorespringShowCorrectAnswerToggle = React.createClass({displayName: 'CorespringShowCorrectAnswerToggle',
  getDefaultProps: function() {
    return {
      showMessage: 'Show correct response',
      hideMessage: 'Hide correct response'
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
                <div class="svg-holder">{
                  (function() {
                    if (self.props.toggle) {
                      return (
                        <svg id="show-icon" preserveAspectRatio="xMinYMin meet" viewBox="-129.5 127 34 35">
                          <path style={{fill: "#B3ABA4", "stroke" : "#CDC7C2", "strokeWidth" : 0.5, "strokeMiterlimit": 10}} d="M-113.2,159c-8,0-14.5-6.5-14.5-14.5s6.5-14.5,14.5-14.5s14.5,6.5,14.5,14.5S-105.2,159-113.2,159z"/>
                          <circle class="show-icon-background" cx="-114.2" cy="143.5" r="14"/>
                          <path class="show-icon-border" d="M-114.2,158c-8,0-14.5-6.5-14.5-14.5s6.5-14.5,14.5-14.5s14.5,6.5,14.5,14.5S-106.2,158-114.2,158zM-114.2,130c-7.4,0-13.5,6.1-13.5,13.5s6.1,13.5,13.5,13.5s13.5-6.1,13.5-13.5S-106.8,130-114.2,130z"/>
                          <polygon class="show-icon-foreground" points="-114.8,150.7 -121.6,144.8 -119,141.8 -115.9,144.5 -111.3,136.3 -107.8,138.2"/>
                        </svg>
                      );
                    } else {
                      return (
                        <svg id="hide-icon" preserveAspectRatio="xMinYMin meet" viewBox="-283 359 34 35">
                          <circle class="hide-icon-background" cx="-266" cy="375.9" r="14"/>
                          <path class="hide-icon-background" d="M-280.5,375.9c0-8,6.5-14.5,14.5-14.5s14.5,6.5,14.5,14.5s-6.5,14.5-14.5,14.5S-280.5,383.9-280.5,375.9zM-279.5,375.9c0,7.4,6.1,13.5,13.5,13.5c7.4,0,13.5-6.1,13.5-13.5s-6.1-13.5-13.5-13.5C-273.4,362.4-279.5,368.5-279.5,375.9z"/>
                          <polygon class="hide-icon-foreground" points="-265.4,383.1 -258.6,377.2 -261.2,374.2 -264.3,376.9 -268.9,368.7 -272.4,370.6         "/>
                        </svg>
                      );
                    }
                  }())
                }</div>
                <div class="label">{
                  (function() {
                    if (self.props.toggle) {
                      return self.props.showMessage;
                    } else {
                      return self.props.hideMessage;
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
  onCheck: function(el) {
    this.props.onChange({
      value: this.props.value, 
      selected: el.target.checked
    });
  },
  render: function() {
    var self = this;
    return (
      <div className="corespring-checkbox">
        <CorespringFeedbackTick correctness={self.props.correctness} />
        <div className="checkbox-holder">
          <Checkbox
            onCheck={self.onCheck}
            label={this.props['display-key'] + '. ' + this.props.label} />
        </div>
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
    outcomes: React.PropTypes.object,
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
  
  _indexToSymbol: function(index) {
    return (this.props.keyMode === 'numbers') ? index + 1 : String.fromCharCode(97 + index).toUpperCase();
  },

  _correctness: function(choice) {
    if (this.props.outcomes) {
      var outcome;
      for (var i in this.props.outcomes) {
        outcome = this.props.outcomes[i];
        if (outcome.value === choice.value) {
          return outcome.correct ? 'correct' : 'incorrect';
        }
      }
    }
  },

  hideShow: function() {
    window.alert('hide show');
  },
  
  render: function() {
    var self = this;
    console.log('this.props', this.props);
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
                <CorespringCheckbox onChange={self.onChange} correctness={self._correctness(choice)} label={choice.label} value={choice.value} component-id={componentId} display-key={self._indexToSymbol(index)}/>
              </div>
            )
          })
        }</div>
      </div>
    );
  }
});

module.exports = CorespringMultipleChoiceReact;
