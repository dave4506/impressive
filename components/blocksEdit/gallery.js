import React, { PropTypes } from 'react';
import Slider from 'react-slick';
import b from './block.css';
import s from './gallery.css';
import Tools from '../tools';
import shortid from 'shortid'

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputUrl:false,
      inputUrlContent:""
    };
  }

  render() {
    const {fileStatus,title,description,onToolClick,onChange} = this.props;
    const {images} = this.props;
    const {inputUrl,inputUrlContent} = this.state;
    return <div className={`${b["block"]} ${b["block__full-width"]} ${s["block-gallery"]}`} >
      <input
        onChange={(e)=>{onChange({title:e.target.value})}}
        placeholder="Title goes here"
        className={`${b["block-title"]}`}
        value={title}
        type="text" />
      <div className={`${s["block-gallery-imgs"]}`}>
        {(()=>{
          const settings = {
            dots: false,
            autoplay:true,
            infinite:true,
            speed: 500,
            lazyLoad: true,
            variableWidth:true,
            pauseOnHover:true,
            draggable:true,
            arrows:false
          };
          if(images.length != 0)
            return <Slider {...settings}>
              {images.map((image,index)=>{
                return (
                  <div className={`${s["block-gallery-imgs-img"]}`} key={index}>
                    <svg onClick={()=>{
                      const newImages = [].concat(images);
                      newImages.splice(index,1);
                      onChange({images:newImages})
                    }} className={`${s["block-gallery-imgs-close"]}`} width="26" height="26" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M24 21.172l-4.956-4.956c-.779-.779-2.041-.775-2.822.006-.786.786-.784 2.045-.006 2.822l4.956 4.956-4.956 4.956c-.778.778-.78 2.036.006 2.822.781.781 2.043.785 2.822.006l4.956-4.956 4.956 4.956c.779.779 2.041.775 2.822-.006.786-.786.784-2.045.006-2.822l-4.956-4.956 4.956-4.956c.778-.778.78-2.036-.006-2.822-.781-.781-2.043-.785-2.822-.006l-4.956 4.956zm0 22.828c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20zm0-4c-8.837 0-16-7.163-16-16s7.163-16 16-16 16 7.163 16 16-7.163 16-16 16z" fill="#FFF"/></svg>
                    <img src={image}/>
                  </div>
                )
              })}
            </Slider>
        })()}
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
        customClass:s["file-input-tool__"+(!inputUrl ? "open":"close")],
        publicTitle:"Add a picture",
        src:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fui-22.svg?alt=media&token=cb52a56f-d621-4b04-b4b6-d2f141b902e8"
      }]} onClick={(tool)=>{if(tool!="ADD"){onToolClick(tool)} else {this.setState({inputUrl:!inputUrl})} }}/>
      <div className={`${s["file-input"]} ${s["file-input__"+(inputUrl ? "open":"close")]}`}>
        <input
          onChange={(e)=>{this.setState({inputUrlContent:e.target.value})}}
          placeholder="Link of the photo. (Ends with .jpg, .png, .gif, or, .svg)"
          className={`${b["block-caption"]}`}
          value={inputUrlContent}/>
        <svg
          onClick={()=>{
            if(inputUrlContent!="") {
              onChange({images:images.concat([inputUrlContent])});
              this.setState({inputUrlContent:""})
            }
          }}
          width="15"
          height="13"
          viewBox="0 0 19 15" xmlns="http://www.w3.org/2000/svg"><path d="M18.999 7.472v-.36500000000000005l-.04-.057-.047-.057-6.333-6.776c-.304-.289-.773-.289-1.077 0-.292.313-.292.806 0 1.12l5.003 5.356h-15.714c-.437 0-.792.363-.792.812 0 .448.354.812.792.812h15.658l-5.074 5.348c-.292.313-.292.806 0 1.12.304.289.773.289 1.077 0l6.333-6.663.047-.057.047-.057v-.43800000000000006l.119-.097z" fill="#000"/></svg>
      </div>
    </div>
  }
}

Gallery.defaultProps = {
  fileStatus: [],
  images:[]
};

export default Gallery
