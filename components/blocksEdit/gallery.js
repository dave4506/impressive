import React, { PropTypes } from 'react';
import Slider from 'react-slick';
import b from './block.css';
import s from './gallery.css';
import Tools from '../tools';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {images,description,title} = this.props;
    const settings = {
      dots: false,
      infinite: true,
      autoplay:true,
      speed: 500,
      lazyLoad: true,
      variableWidth:true,
      pauseOnHover:true,
      draggable:true,
      arrows:false
    };
    return <div className={`${b["block"]} ${b["block__full-width"]} ${s["block-gallery"]}`} >
      <p className={`${b["block-title"]}`}>{title}</p>
      <div className={`${s["block-gallery-imgs"]}`}>
        <Slider {...settings}>
          {images.map((image,index)=>{
            return (
              <div className={`${s["block-gallery-imgs-img"]}`} key={index}>
                <img src={image}/>
              </div>
            )
          })}
        </Slider>
      </div>
      <p className={`${b["block-caption"]}`}>{description}</p>
    </div>
  }
}

export default Gallery
