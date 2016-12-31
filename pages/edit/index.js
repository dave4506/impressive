import React, { PropTypes } from 'react';
import s from './styles.css';
import Layout from '../../components/layout/sidebar'
import Sidebar from './sidebar'
import Mainpage from './mainPage'
import {connect} from 'react-redux';
import {updateAppState} from '../../core/actions/ui'
import {APP_STATE} from '../../core/constants'
import {pullArticles} from '../../core/actions/article'
import {getCurrentUser} from '../../core/actions/user'

class EditPage extends React.Component {
  static propTypes = {
  };
  componentWillMount() {
    this.props.getCurrentUser();
    this.props.updateAppState();
    this.props.pullArticles();
  }
  render() {
    const {appState} = this.props;
    return (
      <div>
        <Layout mainPage={<Mainpage appState={appState}/>} sideBar={<Sidebar/>}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    appState:state.get("ui").get("appState")
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCurrentUser:()=>{
      dispatch(getCurrentUser())
    },
    updateAppState:()=>{
      dispatch(updateAppState(APP_STATE.VIEW))
    },
    pullArticles: () => {
      dispatch(pullArticles());
    }
  }
}

const EditPageRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPage)

export default EditPageRedux;
