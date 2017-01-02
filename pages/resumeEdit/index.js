import React, { PropTypes } from 'react';
import g from '../global.css';
import s from './resumeEdit.css';
import { connect } from 'react-redux';
import Nav from '../../components/nav/landingNav'
import Profile from '../../components/blocksEdit/profile'
import Quote from '../../components/blocksEdit/quote'
import Gallery from '../../components/blocksEdit/gallery'
import Description from '../../components/blocksEdit/description'
import Links from '../../components/blocksEdit/links'
import Icons from '../../components/blocksEdit/icons'
import Cta from '../../components/blocksEdit/cta'
import LineBreak from '../../components/blocksEdit/lineBreak'
import Chat from '../../components/blocksEdit/chat'
import IconRow from '../../components/blocksEdit/iconRow'
import Project from '../../components/blocksEdit/project'
import Input from '../../components/blocksEdit/input'

import {saveArticleTitle,saveArticleState} from '../../core/actions/current'
import {pullArticle} from '../../core/actions/article'
import {updateAppState} from '../../core/actions/ui'
import {APP_STATE} from '../../core/constants'
import history from '../../core/history'

const Article = ({article,onChange}) => {
  return (
    <div>
      <Input
        onChange={onChange(-1)}
        placeholder="Change the title of this piece here."
        value={article.title}
        description="A title is the beginning of a sharing."
      />
    </div>
  )
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
    this.onChange = this.onChange.bind(this)
  }
  static propTypes = {
  };

  componentWillMount() {
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

  render() {
    const {state,props,onChange} = this;
    const {article,status} = props;
    return (
      <div>
        <div className={`${s["edit-status"]} ${s["edit-status__"+status]}`}>
          <p>{statusChange(status)}</p>
        </div>
        <Nav title="impresssive.co" linksL={["Sign out","Back"]} linksR={["Save","Delete"]}/>
        {(()=>{
          if(article.get("uid") != null)
            return <Article article={article.toJS()} onChange={onChange}/>
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
    }
  }
}

const ResumeEditRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResumeEdit)

export default ResumeEditRedux;
