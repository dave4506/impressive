import React from 'react-redux';
import s from 'profileEdit.css';

class ProfileEdit extends React.Component {
  constructor() {

  }

  render() {
    const {profileSrc,name,description,onChange} = this.props;

    return <div className={`${s["block-profile__edit"]}`} >
      <img src={profileSrc}/>
      <input>{name}</h3>
      <
    </div>
  }
}

export const ProfileEdit;
