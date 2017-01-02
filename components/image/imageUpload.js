import React, { PropTypes } from 'react';
import s from './image.css';
import Loader from '../loader/simpleLoader'

class ImageUpload extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    const {classStyles,src,status,onUpload} = this.props;
    return (
      <div className={`${classStyles} ${s["image-upload"]}`}>
        <div style={{opacity:(status=="LOADING" || status=="ERROR") ? 1:0}} onClick={()=>{if(status!="LOADING") this.refs.fileUploader.click()}} className={`${s["image-upload-overlay"]}`}>
          {(()=>{
            if(status=="LOADING" || status=="ERROR")
              return <Loader width="22px" height="22px" color="#FFF" indicator={status}/>
          })()}
          <input accept="image/*" onChange={(e)=>{onUpload(e.target.files[0])}} type="file" ref="fileUploader" style={{display: "none"}} />
        </div>
        <img className={`${s["image-upload-image"]}`} src={src}/>
      </div>
    )
  }
}

export default ImageUpload;
