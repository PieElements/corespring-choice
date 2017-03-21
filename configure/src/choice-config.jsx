import React, { PropTypes } from 'react';
import { green500, grey500 } from 'material-ui/styles/colors';

import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionDone from 'material-ui/svg-icons/action/done';
import EditableHTML from 'corespring-editable-html';
import IconButton from 'material-ui/IconButton';
import MultiLangInput from './multi-lang-input';
import TextField from 'material-ui/TextField';
import cloneDeep from 'lodash/cloneDeep';
import extend from 'lodash/extend';
import isString from 'lodash/isString';

export default class ChoiceConfig extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.onLabelChanged = this.onLabelChanged.bind(this);
  }

  _indexToSymbol(index) {
    return ((this.props.keyMode === 'numbers') ? index + 1 : String.fromCharCode(97 + index).toUpperCase()).toString();
  }

  onTranslationChanged(t, update) {
    let c = cloneDeep(this.props.choice);
    let translation = c.translations.values.find(e => e.lang === t.lang);
    translation.value = update;
    this.props.onChoiceChanged(c);
  }

  onValueChanged(update) {
    let c = cloneDeep(this.props.choice);
    c.value = update;
    this.props.onChoiceChanged(c);
  }

  onToggleCorrect() {
    this.props.onChoiceChanged(extend(this.props.choice, {
      correct: !this.props.choice.correct
    }));
  }

  onLabelChanged(value, lang) {
    let update = cloneDeep(this.props.choice);
    if (lang === undefined) {
      update.label = value;
    } else {
      //convert to a translation array
      if (isString(update.label)) {
        update.label = [{ lang, value }];
      } else {
        let t = update.label.find(t => t.lang === lang);
        t.value = value;
      }
    }
    this.props.onChoiceChanged(update);
  }

  render() {
    let {
      index,
      choice,
      onChoiceChanged,
      onRemoveChoice,
      activeLang } = this.props;


    // const translation = choice.translations.enabled && choice.translations.values.find(t => t.lang === activeLang);

    /*const langInput = translation ? <LangInput
      {...translation}
      onChange={(e, u) => this.onTranslationChanged(translation, u)} /> :
      <TextField value={choice.label} onChange={this.onLabelChanged} />;*/

    return <div className="choice-config">
      <span className="index">{this._indexToSymbol(index)}</span>
      <IconButton
        tooltip={choice.correct ? 'correct' : 'incorrect'}
        onClick={() => this.onToggleCorrect()}>
        <ActionDone color={choice.correct ? green500 : grey500} />
      </IconButton>
      <TextField
        floatingLabelText="value"
        value={choice.value}
        onChange={(e, u) => this.onValueChanged(u)}
        style={{ width: '100px', maxWidth: '100px', marginRight: '10px' }} />

      <MultiLangInput
        textFieldLabel="label"
        value={choice.label}
        lang={activeLang}
        onChange={this.onLabelChanged} />

      <IconButton
        tooltip="delete"
        onClick={onRemoveChoice}><ActionDelete /></IconButton>
    </div >;
  }
}

ChoiceConfig.props = {
  index: PropTypes.number.isRequired,
  keyMode: PropTypes.oneOf(['letters', 'numbers']).isRequired,
  isCorrect: PropTypes.bool.isRequired,
  choice: PropTypes.object.isRequired,
  onChoiceChanged: PropTypes.func.isRequired,
  onToggleCorrect: PropTypes.func.isRequired,
  onRemoveChoice: PropTypes.func.isRequired
}