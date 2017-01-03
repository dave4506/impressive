import React, { PropTypes } from 'react';
import b from './block.css';
import s from './quote.css';
import Tools from '../tools';

class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {quote,author,onToolClick,onChange} = this.props;

    return <div className={`${b["block"]} ${b["block__standard-width"]} ${s["block-quote"]}`} >
      <input
        onChange={(e)=>{onChange({quote:e.target.value})}}
        placeholder="Wise Words"
        className={`${s["block-quote-text"]}`}
        value={quote}
        type="text" />
      <input
        onChange={(e)=>{onChange({author:e.target.value})}}
        placeholder="wisesage"
        className={`${b["block-caption"]}`}
        value={author}
        type="text" />
      <Tools onClick={onToolClick}/>
    </div>
  }
}

export default Quote
