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

const Article = ({article,onChange,onAddClick}) => {
  return (
    <div>
      <Input
        onChange={onChange(-1)}
        placeholder="Change the title of this piece here."
        value={article.title}
        description="A title is the beginning of a sharing."
      />
      <Add onClick={onAddClick}/>
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
    this.onChange = this.onChange.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
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

  onAddClick(type) {

  }

  render() {
    const {state,props,onChange,onAddClick} = this;
    const {article,status} = props;
    return (
      <div>
        <div className={`${s["edit-status"]} ${s["edit-status__"+status]}`}>
          <p>{statusChange(status)}</p>
        </div>
        <Nav title="impresssive.co" linksL={["Sign out","Back","Inspiration"]} linksR={["Save","Delete","Make Public"]}/>
        {(()=>{
          if(article.get("uid") != null)
            return <Article article={article.toJS()} onChange={onChange} onAddClick={onAddClick}/>
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
