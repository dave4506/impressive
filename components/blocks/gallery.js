import React, { PropTypes } from 'react';
import b from './block.css';
import s from './gallery.css';
var Masonry = require('react-masonry-component');

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {images,description,title} = this.props;
    const masonryOptions = {
      columnWidth: '.grid-sizer',
      itemSelector: '.grid-item',
      percentPosition: true
    }
    return <div className={`${b["block"]} ${b["block__standard-width"]} ${s["block-gallery"]}`} >
      <p className={`${b["block-title"]}`}>{title}</p>
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
                  <img src={image}/>
                </div>
              )
            })}
          </Masonry>
      </div>
      <p className={`${b["block-caption"]}`}>{description}</p>
    </div>
  }
}

export default Gallery
