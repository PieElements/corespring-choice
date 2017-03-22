import { green500, grey500 } from 'material-ui/styles/colors';

import ActionLanguage from 'material-ui/svg-icons/action/language';
import IconButton from 'material-ui/IconButton';
import React from 'react';
import TextField from 'material-ui/TextField';
import isString from 'lodash/isString';

export default class MultiLangInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onToggleLangsSupport = this.onToggleLangsSupport.bind(this);
  }

  onChange(e, update) {
    const { lang, value, onChange } = this.props;
    if (isString(value)) {
      onChange(update);
    } else {
      onChange(update, lang);
    }
  }

  onToggleLangsSupport() {
    const { lang, value, onChange } = this.props;

    if (isString(value)) {
      onChange(value, lang);
    } else {
      let t = value.find(t => t.lang === lang);
      onChange(t.value);
    }
  }

  render() {

    let { lang, value, textFieldLabel, disableToggle } = this.props;

    //disable the toggle 
    disableToggle = true;

    const renderValue = isString(value) ? value : value.find(t => t.lang === lang).value;
    return <div className="multi-lang-input">
      <TextField
        floatingLabelText={textFieldLabel}
        name={renderValue}
        value={renderValue}
        style={{ flex: 1 }}
        onChange={this.onChange} />
      {!disableToggle &&
        <IconButton
          tooltip={isString(value) ? 'langs disabled' : 'langs enabled'}
          onClick={this.onToggleLangsSupport}>
          <ActionLanguage
            color={isString(value) ? grey500 : green500} />
        </IconButton>
      }
    </div>;
  }
}