import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var CorespringMultipleChoiceReact = require('./corespring-multiple-choice-react');

var Main = React.createClass({

  render: function() {
    var starting;

    if (this.props.session.response) {
      starting = this.props.session.response;  
    } else {
      starting = _.map(this.props.model.choices, function() {
        return 1;
      });
    }

    var isStatic = this.props.model.env.mode !== 'gather';
    var correct, message;
    
    if (this.props.model.outcome && this.props.model.env.mode === 'evaluate') {
      correct = this.props.model.outcome.correctness === 'correct';
      message = this.props.model.outcome.feedback;
    }

    return (

      <div>
        <MuiThemeProvider>
          <CorespringMultipleChoiceReact
            prompt={this.props.model.prompt} 
            choiceMode={this.props.model.choiceMode}
            keyMode={this.props.model.keyMode}
            choices={this.props.model.choices}
            session={this.props.session} />
        </MuiThemeProvider>
      </div>
    );
  } 
});

pie.framework('react').register('corespring-multiple-choice-react', Main);