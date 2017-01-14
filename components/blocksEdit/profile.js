import React, { PropTypes } from 'react';
import b from './block.css';
import s from './profile.css';
import Tools from '../tools';
import ImageUpload from '../image/imageUpload'
import shortid from 'shortid'

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileHash:""
    };
  }

  onUpload(file) {
    const {onUploadEditorState} = this.props;
    const fileHash = shortid.generate();
    this.setState({profileHash:fileHash})
    onUploadEditorState({file,fileHash},"profile_image","single");
  }

  render() {
    const {profileHash} = this.state;
    const {link,fileStatus,profile_image,name,description,onToolClick,onChange} = this.props;
    const profileStatus = fileStatus[profileHash] || {};
    return <div className={`${b["block"]} ${b["block__standard-width"]} ${s["block-profile"]}`} >
      <ImageUpload status={profileStatus.status} classStyles={s["block-profile-img"]} src={profile_image} onUpload={this.onUpload.bind(this)} />
      <p className={`${b["block-caption"]}`}>Click on profile to change pic.</p>
      <input onChange={(e)=>{onChange({name:e.target.value})}} className={`${s["block-profile-name"]}`} value={name} placeholder="A great person's name"/>
      <input onChange={(e)=>{onChange({description:e.target.value})}} className={`${s["block-profile-description"]}`} value={description} placeholder="What the person done."/>
      <input onChange={(e)=>{onChange({link:e.target.value})}} className={`${b["block-caption"]}`} value={link} placeholder="Link to your site."/>
      <Tools onClick={onToolClick}/>
    </div>
  }
}

Profile.defaultProps = {
  fileStatus: []
};

export default Profile
