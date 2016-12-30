import React, { PropTypes } from 'react';
import s from './editor.css';
import Chatbar from '../chatbar'
import Nav from '../nav/nav'

import blockButtons from './blockButtons'
import inlineButtons from './inlineButtons'
import linkComponent from './linkComponent'
import sideButtons from './sideButtons'

import {AtomicBlockUtils,convertToRaw} from 'draft-js';

import {
  Editor,
  createEditorState,
} from 'medium-draft';

class ViewComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      editorState: createEditorState()
    };
    this.onChange = (editorState) => this.setState({editorState});
  }

  componentDidMount() {
    this.refs.editor.focus();
  }

  render() {
    const {Chatbar,article,draft} = this.props;
    const {editorState,currentChatbar} = this.state;
    console.log("current art:",article,draft);
    return (
      <div className={`${s["editor"]}`}>
        <div className={`${s["editor-nav"]}`}>
          <Nav title="Article" rightInfo={"public"} links={["Edit","Move","Delete"]}/>
        </div>
        <div className={`${s["editor-wrapper"]}`}>
          <div className={`${s["editor-core-wrapper"]}`}>
            <input type="text" placeholder="A great story awaits" className={`${s["editor-introduction"]}`}/>
            <Editor
              ref="editor"
              editorState={editorState}
              onChange={this.onChange}
              placeholder="May the force be with you"
              sideButtons={sideButtons}
              blockButtons={blockButtons}
              inlineButtons={inlineButtons}
              linkComponent={linkComponent}
            />
          </div>
        </div>
        <div className={`${s["editor-chatbar"]}`}>
          <Chatbar/>
        </div>
      </div>
    )
  }
}

export default ViewComponent;
