import React, { PropTypes } from 'react';
import s from './styles.css';
import { connect } from 'react-redux';
import Resume from '../resume/index'

import {logInWithFB} from '../../core/actions/user'
import {updateAppState} from '../../core/actions/ui'
import {APP_STATE} from '../../core/constants'

class LandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  static propTypes = {
  };

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    const {state,props,navOnClick} = this;
    return (
      <div>
        <Resume articleId="BJE2mjDSg"/>
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
