import React, { PropTypes } from 'react';
import s from './editor.css';
import Chatbar from '../chatbar'
import Nav from '../nav/nav'

import blockButtons from './blockButtons'
import inlineButtons from './inlineButtons'
import linkComponent from './linkComponent'
import sideButtons from './sideButtons'
import Dropdown from '../nav/dropdown'

import {AtomicBlockUtils} from 'draft-js';

import {
  Editor,
  createEditorState,
} from 'medium-draft';

class EditorComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      discardDropdown:false,
      deleteConfirm:false
    };
    this.onChange = (editorState) => this.setState({editorState});
  }

  componentDidMount() {
    this.refs.editor.focus();
  }

  navOnClick(i) {
    console.log("nav:",i)
    if(i==0) {
    }
    if(i==2)
      this.setState({discardDropdown:!this.state.discardDropdown})
  }

  deleteOnClick(i) {
    if(i==0)
      this.setState({deleteConfirm:true,discardDropdown:false});
    if(i==1) {
      this.props.deleteDraft();
      this.setState({deleteConfirm:false,discardDropdown:false})
    }
  }

  confirmOnClick(i) {
    if(i==1)
      this.setState({deleteConfirm:false,discardDropdown:true})
    if(i==0) {
      this.props.deleteArticle();
      this.setState({deleteConfirm:false,discardDropdown:false})
    }
  }

  render() {
    const {article,draft} = this.props;
    const {discardDropdown,deleteConfirm} = this.state;
    console.log("current art:",article,draft);
    var rawEditorState = draft.editorState;
    if(rawEditorState.entityMap == null) rawEditorState.entityMap = {};
    const editorState = createEditorState(rawEditorState);
    const status = article.currentDraft == article.publicDraft ? "public":"drafting";
    console.log(editorState,status);
    return (
      <div className={`${s["editor"]}`}>
        <div className={`${s["editor-nav"]}`}>
          <Nav onClick={this.navOnClick.bind(this)} title="Article" rightInfo={status} links={["Publish","Done","Delete"]}/>
          <Dropdown onClick={this.deleteOnClick.bind(this)} accordion={discardDropdown} links={status=="drafting" ? ["delete article","discard draft"] : ["delete article"]}/>
          <Dropdown onClick={this.confirmOnClick.bind(this)} accordion={deleteConfirm} links={["Are you sure?","Nah"]}/>
        </div>
        <div className={`${s["editor-wrapper"]}`}>
          <div className={`${s["editor-core-wrapper"]}`}>
            <input value={article.title} type="text" placeholder="A great story awaits" className={`${s["editor-introduction"]}`}/>
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
          <Chatbar type="blank" />
        </div>
      </div>
    )
  }
}

export default EditorComponent;
