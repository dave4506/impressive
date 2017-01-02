import React, { PropTypes } from 'react';
import b from './block.css';
import s from './profile.css';
import Tools from '../tools';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {profileSrc,name,description,onToolClick} = this.props;
    return <div className={`${b["block"]} ${b["block__standard-width"]} ${s["block-profile"]}`} >
      <img className={`${s["block-profile-img"]}`} src={profileSrc}/>
      <h2 className={`${s["block-profile-name"]}`}>{name}</h2>
      <p className={`${s["block-profile-description"]}`}>{description}</p>
      <Tools tools={[{
        title:"DELETE",
        publicTitle:"Delete above block",
        src:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fui-15.svg?alt=media&token=d59e8719-fe0e-4333-bf3b-5dfaab428eee"
      }]} onClick={onToolClick}/>
    </div>
  }
}

export default Profile
