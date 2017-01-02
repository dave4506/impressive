import React, { PropTypes } from 'react';
import Slider from 'react-slick';
import b from './block.css';
import s from './input.css';
import Tools from '../tools';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {description,title,value,onChange,placeholder} = this.props;
    return <div className={`${b["block"]} ${b["block__standard-width"]} ${s["block-input"]}`} >
      <p className={`${b["block-title"]}`}>{title}</p>
        <input type="text" placeholder={placeholder} onChange={(e)=>{onChange(e.target.value)}} value={value}/>
      <p className={`${b["block-caption"]}`}>{description}</p>
    </div>
  }
}

export default Input
