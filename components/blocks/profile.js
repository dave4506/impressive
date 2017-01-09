import React, { PropTypes } from 'react';
import b from './block.css';
import s from './profile.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {profile_image,name,description} = this.props;

    return <div className={`${b["block"]} ${b["block__standard-width"]} ${s["block-profile"]}`} >
      <img className={`${s["block-profile-img"]}`} src={profile_image}/>
      <h2 className={`${s["block-profile-name"]}`}>{name}</h2>
      <p className={`${s["block-profile-description"]}`}>{description}</p>
    </div>
  }
}

export default Profile
