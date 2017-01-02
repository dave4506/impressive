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
    const {title,subtext} = this.props;
    return <div className={`${b["block"]} ${b["block__standard-width"]} ${s["block-header"]}`} >
      <h1 className={`${s["block-header-title"]}`}>{title}</h1>
      <p className={`${s["block-header-subtext"]}`}>{subtext}</p>
    </div>
  }
}

export default Header
