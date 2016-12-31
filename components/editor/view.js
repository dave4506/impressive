import React, { PropTypes } from 'react';
import s from './editor.css';
import Chatbar from '../chatbar'
import Nav from '../nav/nav'

import blockButtons from './blockButtons'
import inlineButtons from './inlineButtons'
import linkComponent from './linkComponent'
import sideButtons from './sideButtons'

import {convertToRaw} from 'draft-js';

import {
  Editor,
  createEditorState,
} from 'medium-draft';

class ViewComponent extends React.Component {
  constructor(props){
    super(props)
    this.state={}
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    const {Chatbar,article,draft} = this.props;
    const {} = this.state;
    console.log("current art:",article,draft);
    var rawEditorState = draft.editorState;
    if(rawEditorState.entityMap == null) rawEditorState.entityMap = {};
    const editorState = createEditorState(rawEditorState);
    const status = article.currentDraft == article.publicDraft ? "public":"drafting";
    return (
      <div className={`${s["editor"]}`}>
        <div className={`${s["editor-nav"]}`}>
          <Nav title="Article" rightInfo={status} links={["Edit","Delete"]}/>
        </div>
        <div className={`${s["editor-wrapper"]}`}>
          <div className={`${s["editor-core-wrapper"]}`}>
            <h4 className={`${s["editor-introduction"]}`}>{article.title}</h4>
            <Editor
              ref="editor"
              disableToolbar={true}
              onChange={()=>{}}
              editorEnabled={false}
              editorState={editorState}
              placeholder="May the force be with you"
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
