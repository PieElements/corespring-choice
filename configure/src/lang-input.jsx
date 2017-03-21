import React from 'react';
import TextField from 'material-ui/TextField';

export default function LangInput(props) {
  return <TextField
    style={{ width: '100%' }}
    floatingLabelText="label"
    value={props.value}
    onChange={props.onChange} />;
}