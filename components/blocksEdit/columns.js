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
    const {columns,description,title,onChange,onToolClick,onAdd} = this.props;
    return <div className={`${b["block"]} ${b["block__standard-width"]}`} >
      <input
        onChange={(e)=>{onChange({title:e.target.value})}}
        placeholder="Title goes here"
        className={`${b["block-title"]}`}
        value={title}
        type="text" />
      <div className={`${b["block-columns"]}`}>
        {columns.map((c,index)=>{
          return (
            <div key={index} className={`${b["block-column"]}`}>
              {c}
            </div>
          )
        })}
      </div>
      <input
        onChange={(e)=>{onChange({description:e.target.value})}}
        placeholder="Caption goes here"
        className={`${b["block-caption"]}`}
        value={description}
        type="text" />
      <Tools tools={[{
        title:"DELETE",
        publicTitle:"Delete above block",
        src:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fui-15.svg?alt=media&token=d59e8719-fe0e-4333-bf3b-5dfaab428eee"
      },{
        title:"ADD",
        publicTitle:(columns.length < 3 ? "Add a column":"Limit Reached"),
        src:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fui-22.svg?alt=media&token=cb52a56f-d621-4b04-b4b6-d2f141b902e8"
      }]} onClick={(tool)=>{if(tool!="ADD"){onToolClick(tool)} else if(columns.length < 3) {onAdd()}}}/>
    </div>
  }
}

Columns.defaultProps = {
  columns:[]
}

export default Columns
