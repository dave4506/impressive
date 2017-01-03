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
    onUploadEditorState({file,fileHash},"profileSrc","single");
  }

  render() {
    const {profileHash} = this.state;
    const {fileStatus,profileSrc,name,description,onToolClick,onChange} = this.props;
    return <div className={`${b["block"]} ${b["block__standard-width"]} ${s["block-profile"]}`} >
      <ImageUpload status={fileStatus[profileHash]} classStyles={s["block-profile-img"]} src={profileSrc} onUpload={this.onUpload.bind(this)} />
      <p className={`${b["block-caption"]}`}>Click to change pic.</p>
      <input onChange={(e)=>{onChange({name:e.target.value})}} className={`${s["block-profile-name"]}`} value={name} placeholder="A great person's name"/>
      <input onChange={(e)=>{onChange({description:e.target.value})}} className={`${s["block-profile-description"]}`} value={description} placeholder="What the person done."/>
      <Tools onClick={onToolClick}/>
    </div>
  }
}

Profile.defaultProps = {
  fileStatus: []
};

export default Profile
