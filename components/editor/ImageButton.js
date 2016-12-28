import React, { PropTypes } from 'react';
import icon from './icon'

import { addNewBlock } from './helper';

export default class ImageButton extends React.Component {

  static propTypes = {
    setEditorState: PropTypes.func,
    getEditorState: PropTypes.func,
    close: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onClick() {
    this.input.value = null;
    this.input.click();
  }

  onChange(e) {
    const file = e.target.files[0];
    if (file.type.indexOf('image/') === 0) {
      const src = URL.createObjectURL(file);
      this.props.setEditorState(addNewBlock(
        this.props.getEditorState(),
        "atomic:image", {
          src,
        }
      ));
    }
    this.props.close();
  }
  render() {
    const Icon = icon('./icons/image.svg',"");
    return (
      <button
        className="md-side-button"
        type="button"
        onClick={this.onClick}
        title="Add an Image"
      >
        <Icon/>
        <input
          type="file"
          ref={(c) => { this.input = c; }}
          onChange={this.onChange}
          style={{ display: 'none' }}
        />
      </button>
    );
  }
}
