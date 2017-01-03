import React, { PropTypes } from 'react';
import Slider from 'react-slick';
import b from './block.css';
import Tools from '../tools';

class Columns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {columns,description,title,onChange,onToolClick} = this.props;
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
      <Tools tools={[{
        title:"DELETE",
        publicTitle:"Delete above block",
        src:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fui-15.svg?alt=media&token=d59e8719-fe0e-4333-bf3b-5dfaab428eee"
      },{
        title:"ADD",
        customClass:s["file-input-tool__"+(!inputUrl ? "open":"close")],
        publicTitle:"Add a picture",
        src:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fui-22.svg?alt=media&token=cb52a56f-d621-4b04-b4b6-d2f141b902e8"
      }]} onClick={(tool)=>{if(tool!="ADD"){onToolClick(tool)} else {} }}/>
    </div>
  }
}

export default Columns
