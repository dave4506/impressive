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
    return <div className={`${b["block"]} ${b["block__standard-width"]} ${s["block-break"]}`} >
      <div className={`${s["block-break-line"]}`}></div>
    </div>
  }
}

export default LineBreak
