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
    
    if (this.props.model.outcomes && this.props.model.env.mode === 'evaluate') {
      correct = this.props.model.outcomes.correctness === 'correct';
      message = this.props.model.outcomes.feedback;
    }

    console.log('props', this.props);

    return (
      <div>
        <MuiThemeProvider>
          <CorespringMultipleChoiceReact
            outcomes={this.props.model.outcomes}
            correctResponse={this.props.model.config.correctResponse}
            prompt={this.props.model.prompt} 
            choiceMode={this.props.model.choiceMode}
            keyMode={this.props.model.keyMode}
            choices={this.props.model.choices}
            session={this.props.session}
            mode={this.props.model.env.mode} />
        </MuiThemeProvider>
      </div>
    );
  } 
});

pie.framework('react').register('corespring-multiple-choice-react', Main);