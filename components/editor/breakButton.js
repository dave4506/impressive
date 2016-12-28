import React, { PropTypes } from 'react';

import { addNewBlock } from './helper';
import icon from './icon'

export default class BreakButton extends React.Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.setEditorState(addNewBlock(
      this.props.getEditorState(),
      "atomic:break"
    ));
  }

  render() {
    const Icon = icon('./icons/line.svg',"");
    return (
      <button className="md-side-button" onClick={this.onClick} type="button">
        <Icon/>
      </button>
    );
  }
}

BreakButton.propTypes = {
  setEditorState: PropTypes.func,
  getEditorState: PropTypes.func,
  close: PropTypes.func,
};
