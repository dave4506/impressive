import React, { PropTypes } from 'react';
import s from './image.css';
import Loader from '../loader/simpleLoader'

class Image extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      status:"init"
    }
  }
  render() {
    const {status} = this.state;
    const {onClick,src,width,height} = this.props;
    return (
      <div onClick={onClick} className={`${s["image"]}`}>
        <div className={`${s["image-loader__"+status]}`} style={{width,height}}>
          <Loader indicator="loading"/>
        </div>
        <div className={`${s["image-error__"+status]}`} style={{width,height}}>
          <Loader indicator="error"/>
          <div>Error Loading Image</div>
        </div>
        <img className={`${s["image-img__"+status]}`} style={{width,height}} onLoad={()=>{this.setState({status:"loaded"})}} onError={()=>{this.setState({status:"error"})}} src={src}/>
      </div>
    )
  }
}

export default Image;
