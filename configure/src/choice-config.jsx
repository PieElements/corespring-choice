import React, { PropTypes } from 'react';
import { green500, grey500 } from 'material-ui/styles/colors';

import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionDone from 'material-ui/svg-icons/action/done';
import ActionFeedback from 'material-ui/svg-icons/action/feedback';
import Checkbox from 'material-ui/Checkbox';
import CheckboxIcon from 'material-ui/svg-icons/toggle/check-box';
import EditableHTML from 'corespring-editable-html';
import { FeedbackMenu } from './feedback-menu';
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
    this.onFeedbackTypeChanged = this.onFeedbackTypeChanged.bind(this);
    this.onFeedbackChanged = this.onFeedbackChanged.bind(this);
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

  onFeedbackChanged(v, lang) {
    const { choice } = this.props;
    const update = cloneDeep(choice);
    if (!Array.isArray(update.feedback)) {
      console.warn('choice.feedback is not an array');
      return;
    }
    const fb = update.feedback.find(t => t.lang === lang);
    fb.value = v;
    this.props.onChoiceChanged(update);
  }

  onFeedbackTypeChanged(t) {
    const { choice, activeLang } = this.props;
    const update = cloneDeep(choice);
    if (t === 'none') {
      update.feedback = null;
    } else if (t === 'default') {
      update.feedback = choice.correct ? 'Correct!' : 'Incorrect';
    } else if (t === 'custom') {
      update.feedback = [
        { lang: activeLang, value: '' }
      ]
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

    return <div className="choice-config">
      <div className="main">
        <span className="index">{this._indexToSymbol(index)}</span>
        <IconButton
          tooltip={choice.correct ? 'correct' : 'incorrect'}
          onClick={() => this.onToggleCorrect()}>
          <CheckboxIcon color={choice.correct ? green500 : grey500} />
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

        <FeedbackMenu
          value={choice.feedback}
          onChange={this.onFeedbackTypeChanged} />

        <IconButton
          tooltip="delete"
          onClick={onRemoveChoice}><ActionDelete /></IconButton>
      </div>
      {Array.isArray(choice.feedback) &&
        <div className="feedback">
          <MultiLangInput
            textFieldLabel="feedback"
            value={choice.feedback}
            lang={activeLang}
            disableToggle={true}
            onChange={this.onFeedbackChanged} />
        </div>
      }

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