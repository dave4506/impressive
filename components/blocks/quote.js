import React, { PropTypes } from 'react';
import b from './block.css';
import s from './quote.css';

class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {quote,author} = this.props;

    return <div className={`${b["block"]} ${b["block__standard-width"]} ${s["block-quote"]}`} >
      <h1 className={`${s["block-quote-text"]}`}>“{quote}”</h1>
      <p className={`${b["block-caption"]}`}>-{author}</p>
    </div>
  }
}

export default Quote
