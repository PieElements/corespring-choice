import React from 'react';
import StrikeThrough from 'material-ui/svg-icons/editor/format-strikethrough';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';


export default class _Icon extends React.Component {
  render() {
    return <MuiThemeProvider>
      <IconButton tooltip="StrikeThrough"
        disabled={this.props.disabled}>
        <StrikeThrough />
      </IconButton>
    </MuiThemeProvider>
  }
}