import React, { PropTypes } from 'react';
import g from '../global.css';
import { connect } from 'react-redux';
import s from './dashboard.css';
import Nav from '../../components/nav/landingNav'
import Modal from '../../components/modal/index'
import Header from '../../components/blocks/header'
import Table from '../../components/blocksEdit/table'
import Footer from '../../components/footer'

import {createArticle,deleteArticle} from '../../core/actions/current'
import {updateAppState} from '../../core/actions/ui'
import {logOut} from '../../core/actions/user'
import {APP_STATE} from '../../core/constants'
import {pullArticles} from '../../core/actions/article'
import history from '../../core/history'

const createNew = (onChange,value,onSubmit) => {
  return <div className={`${s["table-create"]}`}>
    <input onChange={onChange} value={value} placeholder="Your new spellbinding title awaits."/>
    <svg onClick={(e)=>{if(value!="")onSubmit(e)}} width="15" height="13" viewBox="0 0 19 15" xmlns="http://www.w3.org/2000/svg"><path d="M18.999 7.472v-.36500000000000005l-.04-.057-.047-.057-6.333-6.776c-.304-.289-.773-.289-1.077 0-.292.313-.292.806 0 1.12l5.003 5.356h-15.714c-.437 0-.792.363-.792.812 0 .448.354.812.792.812h15.658l-5.074 5.348c-.292.313-.292.806 0 1.12.304.289.773.289 1.077 0l6.333-6.663.047-.057.047-.057v-.43800000000000006l.119-.097z" fill="#000"/></svg>
  </div>
}

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      create:"",
      deleteConfirm:false,
      dArticle:{}
    }
    this.navOnClick = this.navOnClick.bind(this);
    this.onModifier = this.onModifier.bind(this);
  }
  static propTypes = {
  };

  componentWillMount() {
    this.props.updateAppState();
    this.props.pullArticles();
  }

  componentDidMount() {
  }

  navOnClick(from,link,status) {
    console.log(from,link,status)
    if(from == "right")
      switch (link) {
        case 0: this.props.logOut();
      }
    if(from == "left")
      switch (link) {
        case 0: history.push('enjoy/?aid=Hk7Vf_e8x');
      }
  }

  onModifier(modifier,index) {
    const articles = this.props.articles
    const article = articles[Object.keys(articles)[index]]
    switch (modifier) {
      case "View":
        history.push(`/enjoy/?aid=${article.shortId}`)
        break;
      case "Edit":
        history.push(`/edit/?uid=${history.getCurrentLocation().query.uid}&aid=${article.shortId}`)
        break;
      case "Delete":
        this.setState({deleteConfirm:true,dArticle:article})
      default:
    }
  }

  render() {
    const {state,props,navOnClick,onModifier} = this;
    const {create,deleteConfirm,dArticle} = state;
    const {createArticle,articles,deleteArticle} = props;
    const table = Object.keys(articles).map((a)=>{
      const art = articles[a]
      return {
        text:art.title,
        subtext:`${art.views} views`
      }
    })
    table.push({custom:true,component:createNew((e)=>{this.setState({create:e.target.value})},create,()=>{createArticle(create)})});
    return (
      <div>
        <Modal onClose={()=>{this.setState({deleteConfirm:false})}} modalStatus={deleteConfirm}>
          <div className={`${s["delete-modal"]}`}>
            <h2>Are you sure?</h2>
            <button onClick={()=>{deleteArticle(dArticle);this.setState({dArticle:{},deleteConfirm:false})}} >Delete</button>
            <p>Its a bummer to lose something so cool.</p>
          </div>
        </Modal>
        <Nav
          title="impresssive.co"
          linksR={["Sign out"]}
          linksL={["Inspiration"]}
          onClickR={(i)=>{navOnClick("right",i,true)}}
          onClickL={(i)=>{navOnClick("left",i,true)}}
        />
        <Header title="Your Work" subtext="Show off the best of you."/>
        <Table
          title="Articles"
          style={{padding:"0"}}
          modifiers={["View","Edit","Delete"]}
          onModifier={onModifier}
          table={table}
          description="It only takes some passion to be passionate."
        />
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    articles:state.get("article").get("articles").toJS()
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createArticle: (title) => {
      dispatch(createArticle(title));
    },
    updateAppState:()=>{
      dispatch(updateAppState(APP_STATE.DASHBOARD))
    },
    pullArticles: () => {
      dispatch(pullArticles());
    },
    deleteArticle: (article) => {
      dispatch(deleteArticle(article))
    },
    logOut: () => {
      dispatch(logOut())
    }
  }
}

const DashboardRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

export default DashboardRedux;
