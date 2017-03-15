import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Tabs, Tab} from 'material-ui/Tabs';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import Checkbox from 'material-ui/Checkbox';
import ActionDone from 'material-ui/svg-icons/action/done';
import RaisedButton from 'material-ui/RaisedButton';
import EditableHTML from 'corespring-editable-html';
import { green500 } from 'material-ui/styles/colors';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FeedbackSelector from 'corespring-feedback-config/src/feedback-selector.jsx';
import PartialScoringConfig from 'corespring-scoring-config/src/index.jsx';

require('./index.less');

injectTapEventPlugin();

class Main extends React.Component {

  constructor(props) {
    super(props);
  }

  _indexToSymbol(index) {
    return ((this.props.model.model.keyMode === 'numbers') ? index + 1 : String.fromCharCode(97 + index).toUpperCase()).toString();
  }

  removeChoice(index) {
    console.log(`remove choice at ${index}`);
    this.props.model.model.choices.splice(index, 1);
    this.props.onChoicesChanged(this.props.model.model.choices);
  }

  addChoice(index) {
    this.props.model.model.choices.push({
      label: "",
      value: ""
    })
    this.props.onChoicesChanged(this.props.model.model.choices);
  }

  toggleCorrect(index) {
    let choiceValue = this.props.model.model.choices[index].value;
    let correctIndex = this.props.model.correctResponse.indexOf(choiceValue);
    if (correctIndex >= 0) {
      this.props.model.correctResponse.splice(correctIndex, 1);
    } else {
      this.props.model.correctResponse.push(choiceValue);
    }
    this.props.onChoicesChanged(this.props.model.model.choices);
  }

  onChoiceChange(index, value) {
    this.props.model.model.choices[index].label = value;
    this.props.onChoicesChanged(this.props.model.model.choices);
  }

  onShuffleChange(choice) {
    console.log('want to change shuffle');
  }

  isCorrect(index) {
    return this.props.model.correctResponse.indexOf(this.props.model.model.choices[index].value) >= 0;
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
    let theme = getMuiTheme({});
    console.log('this.props.model', this.props.model);
    return <MuiThemeProvider muiTheme={theme}>
      <div className="corespring-choice-config-root">
        <Tabs>
          <Tab label="Design">
            <div className="design-tab">
              <p>
                In multiple choice, students select the best response from a list of options presented. This interaction allows for 
                either one or more correct answers. Setting more than one answer as correct allows for partial credit (see the scoring tab).
              </p>
              <SelectField floatingLabelText="Response Type" value={this.props.model.model.choiceMode} onChange={this.props.onChoiceModeChanged}>
                <MenuItem value={Main.InputTypes.Radio} primaryText="Radio - One Answer"/>
                <MenuItem value={Main.InputTypes.Checkbox} primaryText="Checkbox - Multiple Answers"/>
              </SelectField>
              <SelectField floatingLabelText="Choice Labels" value={this.props.model.model.keyMode} onChange={this.props.onKeyModeChanged}>
                <MenuItem value={Main.KeyModes.Letters} primaryText="Letters"/>
                <MenuItem value={Main.KeyModes.Numbers} primaryText="Numbers"/>
              </SelectField>
              <table>
                <tbody>{
                  this.props.model.model.choices.map((choice, index) => {
                    return [<tr key={index}>
                      <td className="choice-symbol">
                        <span>{this._indexToSymbol(index)}</span>
                        <IconButton onClick={this.toggleCorrect.bind(this, index)}>
                          <ActionDone color={this.isCorrect(index) ? green500 : '#000000'}/>
                        </IconButton>
                      </td>
                      <td>
                        <EditableHTML model={this.props.model.model.choices[index].label} placeholder="Enter a choice" onChange={this.onChoiceChange.bind(this, index)} /></td>
                      <td>
                        <IconButton onClick={this.removeChoice.bind(this, index)}><ActionDelete/></IconButton>
                      </td>
                    </tr>,
                    <tr>
                      <td></td>
                      <td>
                        <div className="feedback-container">
                          <Card>
                            <CardHeader title="Feedback" showExpandableButton={true}/>
                            <CardText expandable={true}>
                              If this choice is selected, show
                              <FeedbackSelector 
                                feedback={this.props.model.feedback[choice.value]}
                                feedbackType={this.props.model.feedback[choice.value] === undefined ? 'none': 'custom'}
                                onChange={this.onFeedbackChange.bind(this, choice.value)}
                                placeholder="Enter customized feedback to be displayed to the student"
                                keys={['none', 'custom']}/>
                            </CardText>
                          </Card>
                        </div>
                      </td>
                    </tr>,
                    <tr>
                      <td></td>
                      <td>
                        <Checkbox label="Don't Shuffle" value={false} onCheck={this.onShuffleChange.bind(this, choice)}/>
                      </td>
                    </tr>
                    ]
                  })
                }</tbody>
              </table>
              <div className="add-choice">
                <RaisedButton label="Add a choice" onClick={this.addChoice.bind(this)}/>
              </div>
              <div className="shuffle-choices">
                <Checkbox label="Shuffle Choices" value={false} onCheck={this.onShuffleChange.bind(this)}/>
              </div>
            </div>
          </Tab>
          <Tab label="Scoring">
            <div className="scoring-tab">
              <PartialScoringConfig 
                numberOfCorrectResponses={this.props.model.correctResponse.length}
                partialScoring={this.props.model.partialScoring || [{}]}
                onPartialScoringChange={this.onPartialScoringChange.bind(this)} />
            </div>
          </Tab>
        </Tabs>
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