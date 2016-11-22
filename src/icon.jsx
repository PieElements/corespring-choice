import React from 'react';
import StrikeThrough from 'material-ui/svg-icons/editor/format-strikethrough';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';

export default class _Icon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: this.props.disabled || true
    }
  }

  componentWillReceiveProps(next) {
    this.setState({ disabled: next.disabled });
  }

  render() {
    return <MuiThemeProvider>
      <IconButton
        disabled={this.state.disabled}>
        <StrikeThrough />
      </IconButton>
    </MuiThemeProvider >
  }
}