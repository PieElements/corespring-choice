import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { Tab, Tabs } from 'material-ui/Tabs';

import Checkbox from 'material-ui/Checkbox';
import ChoiceConfig from './choice-config';
import FeedbackSelector from 'corespring-feedback-config/src/feedback-selector.jsx';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PartialScoringConfig from 'corespring-scoring-config/src/index.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import SelectField from 'material-ui/SelectField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

require('./index.less');

injectTapEventPlugin();

class Main extends React.Component {

  constructor(props) {
    super(props);
  }


  // removeChoice(index) {
  //   console.log(`remove choice at ${index}`);
  //   this.props.model.model.choices.splice(index, 1);
  //   this.props.onChoicesChanged(this.props.model.model.choices);
  // }


  // toggleCorrect(index) {
  //   let choiceValue = this.props.model.model.choices[index].value;
  //   let correctIndex = this.props.model.correctResponse.indexOf(choiceValue);
  //   if (correctIndex >= 0) {
  //     this.props.model.correctResponse.splice(correctIndex, 1);
  //   } else {
  //     this.props.model.correctResponse.push(choiceValue);
  //   }
  //   this.props.onChoicesChanged(this.props.model.model.choices);
  // }


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

  /** 
   * <p>
    In multiple choice, students select the best response from a list of options presented. This interaction allows for
        either one or more correct answers. Setting more than one answer as correct allows for partial credit (see the scoring tab).
      </p>

      
          <SelectField floatingLabelText="Response Type" value={this.props.model.model.choiceMode} onChange={this.props.onChoiceModeChanged}
            <MenuItem value={Main.InputTypes.Radio} primaryText="Radio - One Answer" />
            <MenuItem value={Main.InputTypes.Checkbox} primaryText="Checkbox - Multiple Answers" />
          </SelectField>
          <SelectField floatingLabelText="Choice Labels" value={this.props.model.model.keyMode} onChange={this.props.onKeyModeChanged}>
            <MenuItem value={Main.KeyModes.Letters} primaryText="Letters" />
            <MenuItem value={Main.KeyModes.Numbers} primaryText="Numbers" />
          </SelectField>

          
          <table>
            <tbody>{
              this.props.model.model.choices.map((choice, index) => <ChoiceConfig choice={choice} />
                return [<tr key={index}>
                <td className="choice-symbol">
                  <span>{this._indexToSymbol(index)}</span>
                  <IconButton onClick={this.toggleCorrect.bind(this, index)}>
                    <ActionDone color={this.isCorrect(index) ? green500 : '#000000'} />
                  </IconButton>
                </td>
                <td>
                  <EditableHTML model={this.props.model.model.choices[index].label} placeholder="Enter a choice" onChange={this.onChoiceChange.bind(this, index)} /></td>
                <td>
                  <IconButton onClick={this.removeChoice.bind(this, index)}><ActionDelete /></IconButton>
                </td>
              </tr>,
                <tr>
                <td></td>
                <td>
                  <div className="feedback-container">
                    <Card>
                      <CardHeader title="Feedback" showExpandableButton={true} />
                      <CardText expandable={true}>
                        If this choice is selected, show
                              <FeedbackSelector
                          feedback={this.props.model.feedback[choice.value]}
                          feedbackType={this.props.model.feedback[choice.value] === undefined ? 'none' : 'custom'}
                          onChange={this.onFeedbackChange.bind(this, choice.value)}
                          placeholder="Enter customized feedback to be displayed to the student"
                          keys={['none', 'custom']} />
                      </CardText>
                    </Card>
                  </div>
                </td>
              </tr>,
                <tr>
                <td></td>
                <td>
                </td>
              </tr>
              ]
              })
            }</tbody>
          </table>
  */
  render() {
    let theme = getMuiTheme({});


    const {
      onChoiceChanged,
      onRemoveChoice,
      onAddChoice,
      model
    } = this.props;

    return <MuiThemeProvider muiTheme={theme}>
      <div className="corespring-choice-config-root">
        <div className="base-types">
          <ChoiceType value={model.choiceMode} onChange={this.props.onChoiceModeChanged} />
          <KeyType value={model.keyMode} onChange={this.props.onKeyModeChanged} />
        </div>
        {model.choices.map((choice, index) => {
          const choiceProps = {
            choice,
            index,
            keyMode: model.keyMode,
            onChoiceChanged: onChoiceChanged.bind(null, index),
            onRemoveChoice: onRemoveChoice.bind(null, index),
            onAddChoice: onAddChoice.bind(null, index)
          }
          return <ChoiceConfig key={index} {...choiceProps} />;
        })}

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
      label: 'Radio - One answer',
      value: 'radio'
    },
    two: {
      label: 'Checkbox - Multiple answers',
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