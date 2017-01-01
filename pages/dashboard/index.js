import React, { PropTypes } from 'react';
import g from '../global.css';
import { connect } from 'react-redux';
import s from './dashboard.css';
import Nav from '../../components/nav/landingNav'
import Modal from '../../components/modal/index'
import Header from '../../components/blocks/header'
import Table from '../../components/blocksEdit/table'

import {logInWithFB} from '../../core/actions/user'
import {updateAppState} from '../../core/actions/ui'
import {APP_STATE} from '../../core/constants'

const createNew = (onChange,value) => {
  return <div className={`${s["table-create"]}`}>
    <input onChange={onChange} value={value} placeholder="Your new spellbinding title awaits."/>
    <svg  width="15" height="13" viewBox="0 0 19 15" xmlns="http://www.w3.org/2000/svg"><path d="M18.999 7.472v-.36500000000000005l-.04-.057-.047-.057-6.333-6.776c-.304-.289-.773-.289-1.077 0-.292.313-.292.806 0 1.12l5.003 5.356h-15.714c-.437 0-.792.363-.792.812 0 .448.354.812.792.812h15.658l-5.074 5.348c-.292.313-.292.806 0 1.12.304.289.773.289 1.077 0l6.333-6.663.047-.057.047-.057v-.43800000000000006l.119-.097z" fill="#000"/></svg>
  </div>
}

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      create:""
    }
    this.navOnClick = this.navOnClick.bind(this);
    this.onModifier = this.onModifier.bind(this);
  }
  static propTypes = {
  };

  componentWillMount() {
    this.props.updateAppState();
  }

  componentDidMount() {
  }

  navOnClick(from,link,status) {
    if(from == "right")
      switch (link) {
      }
    if(from == "left")
      switch (link) {
      }
  }

  onModifier(modifier,index) {

  }

  render() {
    const {state,props,navOnClick,onModifier} = this;
    const {create} = state;
    return (
      <div>
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
          table={[
            {text:"This is something cool!",subtext:"Cool!"},
            {text:"Shaken Chat the cool project",subtext:"whattttt!"},
            {custom:true,component:createNew((e)=>{this.setState({create:e.target.value})},create)}
          ]}
          description="It only takes some passion to be passionate."
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateAppState:()=>{
      dispatch(updateAppState(APP_STATE.DASHBOARD))
    }
  }
}

const DashboardRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

export default DashboardRedux;
