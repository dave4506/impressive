import React, { PropTypes } from 'react';
import b from './block.css';
import s from './lineBreak.css';
import Tools from '../tools';

class LineBreak extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { onToolClick } = this.props;
    return <div className={`${b["block"]} ${b["block__standard-width"]} ${s["block-break"]}`} >
      <div className={`${s["block-break-line"]}`}></div>
      <Tools onClick={onToolClick} />
    </div>
  }
}

export default LineBreak
