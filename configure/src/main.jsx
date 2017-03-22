import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { Tab, Tabs } from 'material-ui/Tabs';
import { blue500, green500, green700, grey400, grey500, red500 } from 'material-ui/styles/colors';

import Checkbox from 'material-ui/Checkbox';
import ChoiceConfig from './choice-config';
import FeedbackSelector from 'corespring-feedback-config/src/feedback-selector.jsx';
import Langs from './langs';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MultiLangInput from './multi-lang-input';
import PartialScoringConfig from 'corespring-scoring-config/src/index.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

require('./index.less');

injectTapEventPlugin();

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green500,
    primary2Color: green700,
    primary3Color: grey400,
  }
});

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeLang: props.model.defaultLang
    }
  }

  onFeedbackChange(choiceValue, value) {
    if (value.feedbackType === 'none') {
      delete this.props.model.feedback[choiceValue];
    } else {
      this.props.model.feedback[choiceValue] = value.feedback;
    }
    this.props.onFeedbackChanged(this.props.model.feedback);
  }

  onPartialScoringChange(partialScoring) {
    this.props.onPartialScoringChanged(partialScoring);
  }

  render() {

    const {
      onChoiceChanged,
      onRemoveChoice,
      onChoiceModeChanged,
      onKeyModeChanged,
      onPromptChanged,
      onAddChoice,
      model
    } = this.props;

    return <MuiThemeProvider muiTheme={muiTheme}>
      <div className="corespring-choice-config-root">
        <div className="base-types">
          <ChoiceType value={model.choiceMode} onChange={onChoiceModeChanged} />
          <KeyType value={model.keyMode} onChange={onKeyModeChanged} />
        </div>
        <hr className="divider" />

        <Langs
          langs={model.langs}
          selected={this.state.activeLang}
          onChange={(e, index, l) => this.setState({ activeLang: l })} />

        <MultiLangInput
          textFieldLabel="prompt"
          value={model.prompt}
          style={{ width: '100%' }}
          lang={this.state.activeLang}
          onChange={onPromptChanged} />


        {model.choices.map((choice, index) => {
          const choiceProps = {
            choice,
            index,
            keyMode: model.keyMode,
            activeLang: this.state.activeLang,
            onChoiceChanged: onChoiceChanged.bind(null, index),
            onRemoveChoice: onRemoveChoice.bind(null, index),
            onAddChoice: onAddChoice.bind(null, index)
          }
          return <ChoiceConfig key={index} {...choiceProps} />;
        })}

        <br />
        <RaisedButton label="Add a choice" onClick={onAddChoice} />
      </div>
    </MuiThemeProvider>
  }

}

Main.InputTypes = {
  Radio: 'radio',
  Checkbox: 'checkbox'
};

Main.KeyModes = {
  Letters: 'letters',
  Numbers: 'numbers'
};

export default Main;



const TwoChoice = (props) => {
  return <div className="two-choice">
    <label className="header">{props.header}</label>
    <RadioButtonGroup
      name="choice-type"
      labelPosition="right"
      valueSelected={props.value}
      onChange={props.onChange}
      defaultSelected={props.defaultSelected}>
      <RadioButton
        value={props.one.value}
        label={props.one.label}
      />
      <RadioButton
        value={props.two.value}
        label={props.two.label}
      />
    </RadioButtonGroup>
  </div>;
}

const ChoiceType = (props) => {
  let choiceProps = {
    header: 'Response Type',
    defaultSelected: 'radio',
    value: props.value,
    onChange: props.onChange,
    one: {
      label: 'Radio',
      value: 'radio'
    },
    two: {
      label: 'Checkbox',
      value: 'checkbox'
    }
  }
  return <TwoChoice {...choiceProps} />;
}

const KeyType = (props) => {
  let choiceProps = {
    header: 'Choice Labels',
    defaultSelected: 'numbers',
    value: props.value,
    onChange: props.onChange,
    one: {
      label: 'Numbers',
      value: 'numbers'
    },
    two: {
      label: 'Letters',
      value: 'letters'
    }
  }
  return <TwoChoice {...choiceProps} />;
}