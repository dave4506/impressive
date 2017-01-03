import React, { PropTypes } from 'react';
import Slider from 'react-slick';
import b from './block.css';
import s from './cta.css';
import Tools from '../tools';

class Cta extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {onChange,button,link,description,title,onToolClick} = this.props;
    const buttonType = 'skeleton';
    return <div className={`${b["block"]} ${b["block__standard-width"]} ${s["block-cta"]}`} >
      <input
        onChange={(e)=>{onChange({title:e.target.value})}}
        placeholder="Caption goes here"
        className={`${b["block-title"]}`}
        value={title}
        type="text" />
      <input
        onChange={(e)=>{onChange({button:e.target.value})}}
        placeholder="Call to Action Here"
        className={`${s["block-cta-btn"]} ${s["block-cta-btn__"+buttonType]}`}
        value={button}
        type="text" />
      <input
        onChange={(e)=>{onChange({link:e.target.value})}}
        placeholder="Link for call to action"
        className={`${b["block-caption"]}`}
        value={link}
        type="text" />
      <input
        onChange={(e)=>{onChange({description:e.target.value})}}
        placeholder="Caption goes here"
        className={`${b["block-caption"]}`}
        value={description}
        type="text" />
      <Tools onClick={onToolClick}/>
    </div>
  }
}

export default Cta
