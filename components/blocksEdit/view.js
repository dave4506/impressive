import React, { PropTypes } from 'react';
import s from './editor.css';
import Chatbar from '../chatbar'
import Nav from '../nav/nav'
import Dropdown from '../nav/dropdown'

import blockButtons from './blockButtons'
import inlineButtons from './inlineButtons'
import linkComponent from './linkComponent'
import sideButtons from './sideButtons'
import {APP_STATE} from '../../core/constants'

import {convertToRaw} from 'draft-js';

import {
  Editor,
  createEditorState,
} from 'medium-draft';

class ViewComponent extends React.Component {
  constructor(props){
    super(props)
    this.state={
      discardDropdown:false,
      deleteConfirm:false
    }
  }

  componentWillReceiveProps(nextProps) {
  }

  navOnClick(i) {
    console.log("nav:",i)
    if(i==0) {
      if(this.props.article.currentDraft == this.props.article.publicDraft)
        this.props.createDraft()
      else
        this.props.updateAppState(APP_STATE.EDIT)
    }
    if(i==1)
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
    const {Chatbar,article,draft} = this.props;
    const {discardDropdown,deleteConfirm} = this.state;
    console.log("current art:",article,draft);
    var rawEditorState = draft.editorState;
    if(rawEditorState.entityMap == null) rawEditorState.entityMap = {};
    const editorState = createEditorState(rawEditorState);
    const status = article.currentDraft == article.publicDraft ? "public":"drafting";
    return (
      <div className={`${s["editor"]}`}>
        <div className={`${s["editor-nav"]}`}>
          <Nav onClick={this.navOnClick.bind(this)} title="Article" rightInfo={status} links={["Edit","Delete"]}/>
          <Dropdown onClick={this.deleteOnClick.bind(this)} accordion={discardDropdown} links={status=="drafting" ? ["delete article","discard draft"] : ["delete article"]}/>
          <Dropdown onClick={this.confirmOnClick.bind(this)} accordion={deleteConfirm} links={["Are you sure?","Nah"]}/>
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
