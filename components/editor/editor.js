import React, { PropTypes } from 'react';
import s from './editor.css';
import EditorToolbar from './editorToolbar'
import {Editor, EditorState} from 'draft-js';

class EditorComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }

  render() {
    const {} = this.props;
    console.log(this.refs);
    return (
      <div className={`${s["editor-wrapper"]}`}>
        <EditorToolbar/>
        <div className={`${s["editor-core-wrapper"]}`}>
          <input type="text" placeholder="A great story awaits" className={`${s["editor-introduction"]}`}/>
          <Editor placeholder="May the force be with you" editorState={this.state.editorState} onChange={this.onChange} />
        </div>
      </div>
    )
  }
}

export default EditorComponent;
