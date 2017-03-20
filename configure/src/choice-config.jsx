import React, { PropTypes } from 'react';

import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionDone from 'material-ui/svg-icons/action/done';
import EditableHTML from 'corespring-editable-html';
import IconButton from 'material-ui/IconButton';
import { green500 } from 'material-ui/styles/colors';

export default class ChoiceConfig extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.onChoiceLabelChanged = this.onChoiceLabelChanged.bind(this);
  }

  _indexToSymbol(index) {
    return ((this.props.keyMode === 'numbers') ? index + 1 : String.fromCharCode(97 + index).toUpperCase()).toString();
  }

  onChoiceLabelChanged(l) {
    let c = {
      label: l,
      value: this.props.choice.value
    }
    this.props.onChoiceChanged(c);
  }

  render() {
    let {
      index,
      choice,
      onToggleCorrect,
      onChoiceChanged,
      onRemoveChoice } = this.props;


    console.log('index:', index, JSON.stringify(choice));

    return <div>
      <span>{this._indexToSymbol(index)}</span>
      <IconButton onClick={onToggleCorrect}>
        <ActionDone color={choice.correct ? green500 : '#000000'} />
      </IconButton>
      <input type="text" value={choice.label} />
      { /*<EditableHTML
        model={choice.label}
        placeholder="Enter a choice"
        onChange={this.onChoiceLabelChanged} /> */}
      <IconButton onClick={onRemoveChoice}><ActionDelete /></IconButton>
    </div>;
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