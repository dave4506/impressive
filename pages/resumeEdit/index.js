import React, { PropTypes } from 'react';
import g from '../global.css';
import s from './resumeEdit.css';
import { connect } from 'react-redux';
import Nav from '../../components/nav/landingNav'

import {updateAppState} from '../../core/actions/ui'
import {APP_STATE} from '../../core/constants'

class Resume extends React.Component {

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
        <Nav title="impresssive.co" linksR={["Save"]} linksL={["Sign Out"]} />
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
  }
}

const ResumeRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(Resume)

export default ResumeRedux;
