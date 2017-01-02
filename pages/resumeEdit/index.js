import React, { PropTypes } from 'react';
import g from '../global.css';
import s from './resumeEdit.css';
import { connect } from 'react-redux';
import Nav from '../../components/nav/landingNav'
import Input from '../../components/blocksEdit/input'
import Add from '../../components/blocksEdit/add'
import shortid from 'shortid';

import {saveArticleTitle,saveArticleState} from '../../core/actions/current'
import {pullArticle} from '../../core/actions/article'
import {updateAppState} from '../../core/actions/ui'
import {uploadEditorState,deleteFile} from '../../core/actions/file'
import {APP_STATE,BLOCKS} from '../../core/constants'
import {Block,defaultBlockProps} from '../blocks'
import history from '../../core/history'

const Article = ({article,onChange,onAddClick,onToolClick,onUploadEditorState}) => {
  return (
    <div>
      <Input
        onChange={onChange(-1)}
        placeholder="Change the title of this piece here."
        value={article.title}
        description="A title is the beginning of a sharing."
      />
      {article.editorState.map((b,i)=>{
        return <BlockEditor
          key={i}
          onUploadEditorState={onUploadEditorState(b.hash)}
          onToolClick={onToolClick(i)}
          onChange={onChange(i)}
          onAddClick={onAddClick(i)}
          block={b}/>
      })}
      <Add hidden={false} onClick={onAddClick(article.editorState.length)}/>
    </div>
  )
}

class BlockEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {mouseHover:true}
  }
  render() {
    const {onChange,onAddClick,block,onToolClick,onUploadEditorState} = this.props;
    const {mouseHover} = this.state;
    return <div onMouseOver={()=>{this.setState({mouseHover:false})}} onMouseOut={()=>{this.setState({mouseHover:true})}}>
      <Add hidden={mouseHover} onClick={onAddClick}/>
      <Block type={block.type} edit={true} props={Object.assign({fileStatus:block.fileStatus,onUploadEditorState,onChange,onToolClick},block.props)}/>
    </div>
  }
}

const statusChange = (status) => {
  switch (status) {
    case "INIT":
    case "LOADING":
    case "SUCCESS":
      return "Up to date";
    case "ERROR":
      return "Error Saving. Pls Refresh.";
    default:
      return "Hmmmm";
  }
}

class ResumeEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
    this.onChange = this.onChange.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.onToolClick = this.onToolClick.bind(this);
    this.onUploadEditorState = this.onUploadEditorState.bind(this);
    this.sanitize = this.sanitize.bind(this);
  }

  static propTypes = {
  };

  componentWillMount() {
    this.props.updateAppState();
    this.props.pullArticle();
  }

  componentDidMount() {
  }

  onChange(index) {
    return (changes) => {
      console.log(changes)
      if(index==-1) {
        this.props.saveArticleTitle(changes);
      }
      else {
        var editorState = this.props.article.get("editorState")
        editorState[index].props = Object.assign({},editorState[index].props,changes);
        console.log(editorState)
        this.props.saveArticleState(editorState);
      }
    }
  }

  onAddClick(index) {
    return (type) => {
      const editorState = this.props.article.get("editorState")
      editorState.splice(index,0,{type,hash:shortid.generate(),props:defaultBlockProps(type)})
      this.props.saveArticleState(editorState);
    }
  }

  sanitize(block) {
    Object.keys(block.props).map((keys)=>{
      const prop = block.props[keys];
      if(typeof prop === "string")
        if(prop.indexOf('firebasestorage') != -1 && prop.indexOf('impresssive-86554') != -1)
          this.props.deleteFile(prop)
      if(typeof prop === "array")
        if(prop.length != 0)
          if(prop[0].indexOf('firebasestorage') != -1 && prop[0].indexOf('impresssive-86554') != -1)
            prop.map((p)=>{
              this.props.deleteFile(p)
            })
    })
  }

  onToolClick(index) {
    return (type) => {
      const editorState = this.props.article.get("editorState");
      if(type == "DELETE") {
        this.sanitize(editorState[index]);
        editorState.splice(index,1)
      }
        this.props.saveArticleState(editorState);
    }
  }

  onUploadEditorState(hash) {
    return (file,key,structure) => {
      this.props.uploadEditorState(file,hash,key,structure)
    }
  }

  render() {
    const {state,props,onChange,onAddClick,onToolClick,onUploadEditorState} = this;
    const {article,status} = props;
    return (
      <div>
        <div className={`${s["edit-status"]} ${s["edit-status__"+status]}`}>
          <p>{statusChange(status)}</p>
        </div>
        <Nav title="impresssive.co" linksL={["Sign out","Back","Inspiration"]} linksR={["Save","Delete","Make Public"]}/>
        {(()=>{
          if(article != null);
            if(article.get("uid") != null)
              return <Article
                onToolClick={onToolClick}
                article={article.toJS()}
                onChange={onChange}
                onAddClick={onAddClick}
                onUploadEditorState={onUploadEditorState}/>
        })()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    article:state.get("current").get("article"),
    status:state.get("current").get("status")
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    pullArticle: () => {
      dispatch(pullArticle())
    },
    saveArticleTitle: (title) => {
      dispatch(saveArticleTitle(title));
    },
    saveArticleState: (state) => {
      dispatch(saveArticleState(state));
    },
    updateAppState: () => {
      dispatch(updateAppState(APP_STATE.EDIT))
    },
    uploadEditorState: (file,hash,key,structure) => {
      dispatch(uploadEditorState(file,hash,key,structure))
    },
    deleteFile: (url) => {
      dispatch(deleteFile(url));
    }
  }
}

const ResumeEditRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResumeEdit)

export default ResumeEditRedux;
