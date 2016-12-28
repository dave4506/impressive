import React, { PropTypes } from 'react';
import s from './chatbar.css';


class Chatbar extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    const {} = this.props;
    return (
      <div className={`${s["chatbar"]}`}>
      </div>
    )
  }
}

export default Chatbar;
