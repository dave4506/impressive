import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import s from './sidebar.css';
import Footer from '../../components/list/footer'
import List from '../../components/list/list'
import HeaderEditable from '../../components/list/headerEditable'
import Tabs from '../../components/list/tabs'
import Title from '../../components/list/title'
import Collapse from '../../components/list/collapseListItem'
import Article from '../../components/accordion/article'

import {setCurrentId} from '../../core/actions/current'
import {pullProfile,editProfile} from '../../core/actions/profile'
import {uploadProfilePic} from '../../core/actions/file'
import {Map} from 'immutable';
import history from '../../core/history'

const src = require('./profile.png');

const Articles = ({articles,onArticleClick}) => {
  return <div>
    {Object.keys(articles).map((a,i)=>{
      const article = articles[a];
      return <Article
          key={i}
          i={i}
          onClick={()=>{onArticleClick(article["uid"])}}
          title={article["title"]}
          subText="this is cool..."
        />
    })}
  </div>
}

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable:false,
      link:null,
      subtext:null
    }
  }

  componentWillMount() {
    console.log("mounted?");
    this.props.pullProfile();
  }

  onClick(btn) {
    console.log("btn:",btn);
    if(btn == "edit") {
      const {profile} = this.props;
      this.setState({editable:true,link:profile.get("link"),subtext:profile.get("subtext")});
    }
    if(btn == "close")
      this.setState({editable:false});
    if(btn == "done") {
      this.props.editProfile({link:this.state.link,subtext:this.state.subtext});
      this.setState({editable:false});
    }
  }

  onArticleClick(art) {
    this.props.setCurrentId(art);
  }

  onChange(value,key) {
    console.log("change:",value,key);
    var obj = {};
    obj[key] = value
    this.setState(obj);
    if(key=="photoURL")
      this.props.uploadProfilePic(value);
  }

  render() {
    const {state,props} = this;
    const {profile,articles} = props;
    const {editable,subtext,link} = state;
    return (
      <div className={`${s["side-bar"]}`}>
        <List>
          <HeaderEditable
            onChange={this.onChange.bind(this)}
            editable={editable}
            onClick={this.onClick.bind(this)}
            src={profile.get("photoURL")}
            subtext={editable ? subtext:profile.get("subtext")}
            author={profile.get("displayName")}
            link={editable ? link:profile.get("link")}
          />
          <Title>This is Me</Title>
          <Articles articles={articles.toJS()} onArticleClick={this.onArticleClick.bind(this)}/>
          <Footer>
            <div className={`${s["side-bar-footer-text"]}`}>
              <h3>impresssive.co</h3>
              <h4>Created with love by download horizons.</h4>
            </div>
          </Footer>
        </List>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    profile:state.get("profile"),
    user:state.get("user"),
    articles:state.get("article").get("articles")
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    pullProfile: ()=>{
      dispatch(pullProfile(history.getCurrentLocation().query.uid))
    },
    uploadProfilePic: (file)=>{
      dispatch(uploadProfilePic(file));
    },
    editProfile: (profile)=>{
      dispatch(editProfile(Map(profile)));
    },
    setCurrentId: (id) => {
      dispatch(setCurrentId(id));
    }
  }
}

const SidebarRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)

export default SidebarRedux;
