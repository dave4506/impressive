import React, { PropTypes } from 'react';
import g from '../global.css';
import s from './resumeEdit.css';
import { connect } from 'react-redux';
import Nav from '../../components/nav/landingNav'
import Footer from '../../components/footer'
import Input from '../../components/blocksEdit/input'
import Add from '../../components/blocksEdit/add'
import shortid from 'shortid';
import Modal from '../../components/modal/index'

import {saveArticleTitle,saveArticleState,deleteArticle,saveArticlePublic} from '../../core/actions/current'
import {pullArticle} from '../../core/actions/article'
import {updateAppState} from '../../core/actions/ui'
import {uploadEditorState,deleteFile} from '../../core/actions/file'
import {APP_STATE,BLOCKS} from '../../core/constants'
import {Block,defaultBlockProps} from '../blocks'
import history from '../../core/history'

const Article = ({file,article,onChange,onAddClick,onToolClick,onUploadEditorState}) => {
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
          block={Object.assign({},b,{fileStatus:file[i]})}/>
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
      deleteConfirm:false
    }
    this.onChange = this.onChange.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.onToolClick = this.onToolClick.bind(this);
    this.onUploadEditorState = this.onUploadEditorState.bind(this);
    this.sanitize = this.sanitize.bind(this);
    this.navOnClick = this.navOnClick.bind(this);
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
    Object.keys(block.props).map((key)=>{
      const prop = block.props[key];
      if(key.indexOf('images') != -1)
        prop.map((p)=>{
          console.log(p);
          this.props.deleteFile(p)
        })
      else if(key.indexOf('image') != -1)
        this.props.deleteFile(prop)
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
    return (file,key,structure,custom) => {
      this.props.uploadEditorState(file,hash,key,structure,custom)
    }
  }

  navOnClick(from,link,status) {
    console.log(from,link,status)
    if(from == "right")
      switch (link) {
        case 0: this.props.saveArticleState(this.props.article.get("editorState"));break;
        case 1: this.setState({deleteConfirm:true});break;
        case 2: this.props.saveArticlePublic(!this.props.article.get("public"));break;
      }
    if(from == "left")
      switch (link) {
        case 0: this.props.logOut();break;
        case 1: history.push('/');break;
        case 2: history.push('/enjoy/?aid=Hk7Vf_e8x');break
      }
  }

  render() {
    const {saveArticlePublic,state,props,onChange,onAddClick,navOnClick,onToolClick,onUploadEditorState} = this;
    const {article,status,file,deleteArticle} = props;
    const {deleteConfirm} = state;
    return (
      <div className={`${s["editor"]}`}>
        <Modal onClose={()=>{this.setState({deleteConfirm:false})}} modalStatus={deleteConfirm}>
          <div className={`${s["delete-modal"]}`}>
            <h2>Are you sure?</h2>
            <button onClick={()=>{deleteArticle(article.toJS());this.setState({deleteConfirm:false});history.push('/');}} >Delete</button>
            <p>Its a bummer to lose something so cool.</p>
          </div>
        </Modal>
        <div className={`${s["edit-status"]} ${s["edit-status__"+status]}`}>
          <p>{statusChange(status)}</p>
        </div>
        <Nav
          title="impresssive.co"
          linksL={["Sign out","Back","Inspiration"]}
          linksR={["Save","Delete",(article.get("public") == false ? "Make Public": "Make Private")]}
          onClickR={(i)=>{navOnClick("right",i,true)}}
          onClickL={(i)=>{navOnClick("left",i,true)}}
        />
        {(()=>{
          if(article != null);
            if(article.get("uid") != null)
              return <Article
                onToolClick={onToolClick}
                article={article.toJS()}
                file={file.toJS()}
                onChange={onChange}
                onAddClick={onAddClick}
                onUploadEditorState={onUploadEditorState}/>
        })()}
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    article:state.get("current").get("article"),
    status:state.get("current").get("status"),
    file:state.get("file").get("fileStatus")
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
    uploadEditorState: (file,hash,key,structure,custom) => {
      dispatch(uploadEditorState(file,hash,key,structure,custom))
    },
    deleteFile: (url) => {
      dispatch(deleteFile(url));
    },
    deleteArticle: (article) => {
      dispatch(deleteArticle(article))
    },
    saveArticlePublic: (status) => {
      dispatch(saveArticlePublic(status))
    }
  }
}

const ResumeEditRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResumeEdit)

export default ResumeEditRedux;
