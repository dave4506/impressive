import React, { PropTypes } from 'react';
import Slider from 'react-slick';
import b from './block.css';
import s from './header.css';
import Tools from '../tools';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {title,subtext,onChange,onToolClick} = this.props;
    return <div className={`${b["block"]} ${b["block__standard-width"]} ${s["block-header"]}`} >
      <input
        onChange={(e)=>{onChange({title:e.target.value})}}
        placeholder="Title goes here"
        className={`${s["block-header-title"]}`}
        value={title}
        type="text" />
      <input
        onChange={(e)=>{onChange({subtext:e.target.value})}}
        placeholder="Caption goes here"
        className={`${s["block-header-subtext"]}`}
        value={subtext}
        type="text" />
      <Tools onClick={onToolClick}/>
    </div>
  }
}

export default Header
