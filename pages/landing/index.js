import React, { PropTypes } from 'react';
import s from './styles.css';
import Nav from '../../components/nav/landingNav'
import Modal from '../../components/modal/index'

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
    return (
      <div>
        <Modal onClose={()=>{navOnClick(0,false)}} modalStatus={joinButton}>
          <div>
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

export default LandingPage;
