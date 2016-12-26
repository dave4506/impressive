import React, { PropTypes } from 'react';
import s from './editor.css';
import EditorToolbar from './editorToolbar'

class Editor extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    const {} = this.props;
    return (
      <div className={`${s["editor-wrapper"]}`}>
        <EditorToolbar/>
      </div>
    )
  }
}

export default Editor;
