import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import React from 'react';

export default class Langs extends React.Component {

  render() {
    let { langs, selected, onChange } = this.props;
    return <div className="langs">
      <div className="label">Language:</div>
      <DropDownMenu
        value={selected}
        onChange={onChange}>
        {
          langs.map((l) => <MenuItem key={l} value={l} primaryText={l} />)
        }
      </DropDownMenu>
    </div>;
  }
}