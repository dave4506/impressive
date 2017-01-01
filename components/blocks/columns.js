import React, { PropTypes } from 'react';
import Slider from 'react-slick';
import b from './block.css';

class Columns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {columns,description,title} = this.props;
    console.log(columns,description,title)
    return <div className={`${b["block"]} ${b["block__standard-width"]}`} >
      <p className={`${b["block-title"]}`}>{title}</p>
      <div className={`${b["block-columns"]}`}>
        {columns.map((c,index)=>{
          console.log(c);
          return (
            <div key={index} className={`${b["block-column"]}`}>
              {c}
            </div>
          )
        })}
      </div>
      <p className={`${b["block-caption"]}`}>{description}</p>
    </div>
  }
}

export default Columns
