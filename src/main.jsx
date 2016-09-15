import React from 'react';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import CorespringMultipleChoiceReact from './corespring-multiple-choice-react.jsx';

var style = require('!style!css!less!./index.less');

class Main extends React.Component {

  render () {
    console.log('props', this.props);

    return (
      <div>
        <MuiThemeProvider>
          <CorespringMultipleChoiceReact
            model={this.props.model}
            outcomes={this.props.model.outcomes}
            correctResponse={this.props.model.correctResponse}
            prompt={this.props.model.prompt}
            choiceMode={this.props.model.choiceMode}
            keyMode={this.props.model.keyMode}
            choices={this.props.model.choices}
            session={this.props.session}
            mode={this.props.model.mode} />
        </MuiThemeProvider>
      </div>
    );
  } 
}

Main.propTypes = {
  model: React.PropTypes.object,
  session: React.PropTypes.object
};

Main.defaultProps = {
  model: {},
  session: {}
}

export default Main;
