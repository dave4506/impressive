import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import s from './sidebar.css';
import Footer from '../../components/list/footer'
import List from '../../components/list/list'
import HeaderEditable from '../../components/list/headerEditable'
import Tabs from '../../components/list/tabs'
import Collapse from '../../components/list/collapseListItem'
import Article from '../../components/accordion/article'

import {pullProfile} from '../../core/actions/profile'
import history from '../../core/history'

const src = require('./profile.png');

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable:false
    }
  }

  componentWillMount() {
    this.props.pullProfile();
  }

  onClick(btn) {
    if(btn == "edit")
      this.setState({editable:true});
  }

  render() {
    const {state,props} = this;
    const {profile} = props;
    return (
      <div className={`${s["side-bar"]}`}>
        <List>
          <HeaderEditable onClick={this.onClick.bind(this)} src={profile.get("photoURL")} subtext={profile.get("subtext")} author={profile.get("displayName")} link={profile.get("link")}/>
          <Tabs tabs={["Curated","All Articles"]} active={0}/>
          <Collapse defaultAccordion={true} title="This is me">
            <Article i={0} title="Hello World?" subText="this is cool..."/>
            <Article i={1} title="Hello World?" subText="this is cool..."/>
          </Collapse>
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
    profile:state.get("profile")
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    pullProfile: ()=>{
      dispatch(pullProfile(history.getCurrentLocation().query.uid))
    }
  }
}

const SidebarRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)

export default SidebarRedux;
