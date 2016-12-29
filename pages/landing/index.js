import React, { PropTypes } from 'react';
import s from './styles.css';
import { connect } from 'react-redux';
import Nav from '../../components/nav/landingNav'
import Modal from '../../components/modal/index'

import {logInWithFB} from '../../core/actions/user'
import {updateAppState} from '../../core/actions/ui'
import {APP_STATE} from '../../core/constants'

class LandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      joinButton:false,
      signInButton:false
    }
    this.navOnClick = this.navOnClick.bind(this);
  }
  static propTypes = {
  };

  componentWillMount() {
    this.props.updateAppState();
  }

  componentDidMount() {
  }

  navOnClick(link,status) {
    switch (link) {
      case 0:this.setState({joinButton:status});break;
      case 1:this.setState({signInButton:status});break;
    }
  }

  render() {
    const {state,props,navOnClick} = this;
    const {joinButton,signInButton} = state;
    const {logInWithFB} = props;
    return (
      <div>
        <Modal onClose={()=>{navOnClick(0,false)}} modalStatus={joinButton}>
          <div onClick={logInWithFB}>
            Create with facebook
          </div>
        </Modal>
        <Modal onClose={()=>{navOnClick(1,false)}} modalStatus={signInButton}>
          <div>
            Sign in with facebook
          </div>
        </Modal>
        <Nav onClick={(l)=>{navOnClick(l,true)}} title="impresssive.co" rightInfo={"A Download Horizons Project"} links={["Join Today","Sign In"]}/>
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
    logInWithFB:()=>{
      dispatch(logInWithFB())
    },
    updateAppState:()=>{
      dispatch(updateAppState(APP_STATE.INDEX))
    }
  }
}

const LandingPageRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage)

export default LandingPageRedux;
