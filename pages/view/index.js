import React, { PropTypes } from 'react';
import s from './styles.css';
import {updateAppState} from '../../core/actions/ui'
import {APP_STATE} from '../../core/constants'
import {connect} from 'react-redux';

class ViewPage extends React.Component {

  static propTypes = {
  };

  componentWillMount() {
    this.props.updateAppState();
  }

  render() {
    return (
      <div>
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
      dispatch(updateAppState(APP_STATE.PUBLIC))
    }
  }
}

const ViewPageRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPage)

export default ViewPageRedux;
