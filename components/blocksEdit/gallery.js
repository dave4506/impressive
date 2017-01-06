import React, { PropTypes } from 'react';
import {connect} from 'react-redux'

import Slider from 'react-slick';
import b from './block.css';
import s from './gallery.css';
import Tools from '../tools';
import shortid from 'shortid'
import {deleteFile} from '../../core/actions/file';
var Masonry = require('react-masonry-component');

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      galleryHashes:[]
    };
    this.onUpload = this.onUpload.bind(this);
  }

  onUpload(file) {
    const {onUploadEditorState} = this.props;
    const {galleryHashes} = this.state;
    const fileHash = shortid.generate();
    this.setState({galleryHashes:galleryHashes.concat([fileHash])})
    onUploadEditorState({file,fileHash},"images","array");
  }

  componentDidMount() {
  }

  render() {
    const {deleteFile,fileStatus,images,title,description,onToolClick,onChange} = this.props;
    const {} = this.state;
    const masonryOptions = {
      columnWidth: '.grid-sizer',
      itemSelector: '.grid-item',
      percentPosition: true
    }
    return <div className={`${b["block"]} ${b["block__standard-width"]} ${s["block-gallery"]}`} >
      <input
        onChange={(e)=>{onChange({title:e.target.value})}}
        placeholder="Title goes here"
        className={`${b["block-title"]}`}
        value={title}
        type="text" />
      <div className={`${s["block-gallery-imgs"]}`}>
        <Masonry
              className={`${s["block-masonry"]}`}
              elementType={'div'}
              options={masonryOptions}
              disableImagesLoaded={false}
              updateOnEachImageLoad={true}
          >
            <div style={{width:"50%"}} className="grid-sizer"></div>
            {images.map((image,index)=>{
              return (
                <div className={`grid-item ${s["block-gallery-imgs-img"]}`} key={index}>
                  <div className={`${s["img-overlay"]}`}>
                    <svg onClick={()=>{
                      const newImages = [].concat(images);
                      deleteFile(newImages[index]);
                      newImages.splice(index,1);
                      onChange({images:newImages});
                    }} className={`${s["block-gallery-imgs-close"]}`} width="26" height="26" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M24 21.172l-4.956-4.956c-.779-.779-2.041-.775-2.822.006-.786.786-.784 2.045-.006 2.822l4.956 4.956-4.956 4.956c-.778.778-.78 2.036.006 2.822.781.781 2.043.785 2.822.006l4.956-4.956 4.956 4.956c.779.779 2.041.775 2.822-.006.786-.786.784-2.045.006-2.822l-4.956-4.956 4.956-4.956c.778-.778.78-2.036-.006-2.822-.781-.781-2.043-.785-2.822-.006l-4.956 4.956zm0 22.828c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20zm0-4c-8.837 0-16-7.163-16-16s7.163-16 16-16 16 7.163 16 16-7.163 16-16 16z" fill="#FFF"/></svg>
                  </div>
                  <img src={image}/>
                </div>
              )
            })}
            {Object.keys(fileStatus).map((key,index)=>{
              const status = fileStatus[key];
              console.log(status);
              if(status.status != "SUCCESS" && status.src != null)
                return <div className={`grid-item ${s["block-gallery-imgs-img"]} ${s["block-gallery-imgs-img__preview"]}`} key={index}>
                  <img src={status.src}/>
                </div>
            })}
          </Masonry>
      </div>
      <input
        onChange={(e)=>{onChange({description:e.target.value})}}
        placeholder="Caption goes here"
        className={`${b["block-caption"]}`}
        value={description}/>
      <input accept="image/*" onChange={(e)=>{this.onUpload(e.target.files[0])}} type="file" ref="fileUploader" style={{display: "none"}} />
      <Tools tools={[{
        title:"DELETE",
        publicTitle:"Delete above block",
        src:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fui-15.svg?alt=media&token=d59e8719-fe0e-4333-bf3b-5dfaab428eee"
      },{
        title:"ADD",
        publicTitle:"Add a picture",
        src:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fui-22.svg?alt=media&token=cb52a56f-d621-4b04-b4b6-d2f141b902e8"
      }]} onClick={(tool)=>{if(tool!="ADD"){onToolClick(tool)}else{this.refs.fileUploader.click()}}}/>
    </div>
  }
}


Gallery.defaultProps = {
  fileStatus: {},
  images:[]
};

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteFile: (url) => {
      dispatch(deleteFile(url))
    }
  }
}

const GalleryRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(Gallery)

export default GalleryRedux
