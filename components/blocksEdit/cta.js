import React, { PropTypes } from 'react';
import Slider from 'react-slick';
import b from './block.css';
import s from './cta.css';

class Cta extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {button,buttonType,description,title} = this.props;
    return <div className={`${b["block"]} ${b["block__standard-width"]} ${s["block-cta"]}`} >
      <p className={`${b["block-title"]}`}>{title}</p>
      <button className={`${s["block-cta-btn"]} ${s["block-cta-btn__"+buttonType]}`}>{button}</button>
      <p className={`${b["block-caption"]}`}>{description}</p>
    </div>
  }
}

export default Cta
