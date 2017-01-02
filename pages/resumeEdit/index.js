import React, { PropTypes } from 'react';
import g from '../global.css';
import s from './resumeEdit.css';
import { connect } from 'react-redux';
import Nav from '../../components/nav/landingNav'
import Input from '../../components/blocksEdit/input'
import Add from '../../components/blocksEdit/add'

import {saveArticleTitle,saveArticleState} from '../../core/actions/current'
import {pullArticle} from '../../core/actions/article'
import {updateAppState} from '../../core/actions/ui'
import {APP_STATE} from '../../core/constants'
import history from '../../core/history'
import { BLOCKS } from '../../core/constants'
import {Block,defaultBlockProps} from '../blocks'

const Article = ({article,onChange,onAddClick,onToolClick}) => {
  return (
    <div>
      <Input
        onChange={onChange(-1)}
        placeholder="Change the title of this piece here."
        value={article.title}
        description="A title is the beginning of a sharing."
      />
      {article.editorState.map((b,i)=>{
        return <BlockEditor key={i} onToolClick={onToolClick(i)} onChange={onChange(i)} onAddClick={onAddClick(i)} block={b}/>
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
    const {onChange,onAddClick,block,onToolClick} = this.props;
    const {mouseHover} = this.state;
    return <div onMouseOver={()=>{this.setState({mouseHover:false})}} onMouseOut={()=>{this.setState({mouseHover:true})}}>
      <Add hidden={mouseHover} onClick={onAddClick}/>
      <Block type={block.type} edit={true} props={Object.assign({onChange,onToolClick},block.props)}/>
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
      if(index==-1)
        this.props.saveArticleTitle(changes);
    }
  }

  onAddClick(index) {
    return (type) => {
      const editorState = this.props.article.get("editorState")
      editorState.splice(index,0,{type,props:defaultBlockProps(type)})
      this.props.saveArticleState(editorState);
    }
  }

  onToolClick(index) {
    return (type) => {
      const editorState = this.props.article.get("editorState");
      if(type == "DELETE")
        editorState.splice(index,1)
        this.props.saveArticleState(editorState);
    }
  }

  render() {
    const {state,props,onChange,onAddClick,onToolClick} = this;
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
              return <Article onToolClick={onToolClick} article={article.toJS()} onChange={onChange} onAddClick={onAddClick}/>
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
    }
  }
}

const ResumeEditRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResumeEdit)

export default ResumeEditRedux;
