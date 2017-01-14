import React, { PropTypes } from 'react';
import g from '../global.css';
import s from './resume.css';
import { connect } from 'react-redux';
import Nav from '../../components/nav/logInNav'
import LandingNav from '../../components/nav/landingNav'
import Footer from '../../components/footer'

import {Block,defaultBlockProps} from '../blocks'
import {APP_STATE,BLOCKS} from '../../core/constants'
import {pullArticle} from '../../core/actions/article'
import {updateAppState} from '../../core/actions/ui'
import history from '../../core/history'
import {logOut,getCurrentUser} from '../../core/actions/user'

const Article = ({article}) => {
  return (
    <div>
      {article.editorState.map((b,i)=>{
        return <Block
          type={b.type}
          edit={false}
          props={Object.assign({},b.props)}
          key={i}
        />
      })}
    </div>
  )
}

class Resume extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    this.navOnClick = this.navOnClick.bind(this);
  }
  static propTypes = {
  };

  componentWillMount() {
    this.props.updateAppState();
    this.props.getCurrentUser();
    this.props.pullArticle(this.props.articleId);
  }

  componentDidMount() {
  }

  navOnClick(from,link,status) {
    console.log(from,link,status)
    if(from == "right")
      switch (link) {
        case 0: this.props.logOut();break;
      }
    if(from == "left")
      switch (link) {
        case 0: history.push('/');break;
      }
  }

  render() {
    const {state,props,navOnClick} = this;
    const {article,uid} = props;
    return (
      <div>
        {(()=>{
          if(uid)
            return <LandingNav
             onClickR={(i)=>{navOnClick("right",i,true)}}
             onClickL={(i)=>{navOnClick("left",i,true)}}
             title="impresssive.co" linksL={["Back"]} linksR={["Sign Out"]}/>
          else
            return <Nav/>
        })()}
        <div className={`${s["resume"]}`}>
          {(()=>{
            if(article != null);
              if(article.get("uid") != null)
                return <Article
                  article={article.toJS()}/>
          })()}
        </div>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    article:state.get("current").get("article"),
    uid:state.get("user").get("uid")
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateAppState: () => {
      dispatch(updateAppState(APP_STATE.VIEW))
    },
    getCurrentUser: () => {
      dispatch(getCurrentUser())
    },
    pullArticle: (artId) => {
      dispatch(pullArticle(artId))
    },
    logOut: () => {
      dispatch(logOut())
    }
  }
}

const ResumeRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(Resume)

export default ResumeRedux;
