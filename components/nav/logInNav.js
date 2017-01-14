import React, { PropTypes } from 'react';
import s from './nav.css';
import m from './modal.css';
import history from '../../core/history'
import Nav from './landingNav'
import Modal from '../modal'
import {logInWithFB} from '../../core/actions/user'
import { connect } from 'react-redux';

class LoginNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      joinButton:false,
      signInButton:false
    }
    this.navOnClick = this.navOnClick.bind(this);
  }

  navOnClick(from,link,status) {
    console.log(from,link,status)
    if(from == "left")
      switch (link) {
        case 0:this.setState({signInButton:status});break;
      }
    if(from == "right")
      switch (link) {
        case 0:this.setState({joinButton:status});break;
      }
  }

  render() {
    const {navOnClick} = this;
    const {logInWithFB} = this.props;
    const {joinButton,signInButton} = this.state;
    return (
      <div>
        <Modal onClose={()=>{navOnClick("right",0,false)}} modalStatus={joinButton}>
          <div className={`${m["modal"]}`}>
            <h2>Let's Go!</h2>
            <button className={`${m["fb-button"]}`} onClick={logInWithFB}>
              Sign in with facebook
            </button>
          </div>
        </Modal>
        <Modal onClose={()=>{navOnClick("left",0,false)}} modalStatus={signInButton}>
          <div className={`${m["modal"]}`}>
            <h2>Let's Go!</h2>
            <button className={`${m["fb-button"]}`} onClick={logInWithFB}>
              Sign in with facebook
            </button>
          </div>
        </Modal>
        <Nav
          title="impresssive.co"
          linksR={["Sign in"]}
          linksL={["Join Today"]}
          onClickR={(i)=>{navOnClick("right",i,true)}}
          onClickL={(i)=>{navOnClick("left",i,true)}}
        />
      </div>)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logInWithFB:()=>{
      dispatch(logInWithFB())
    }
  }
}

const LoginNavRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginNav)

export default LoginNavRedux;
