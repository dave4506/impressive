import React, { PropTypes } from 'react';
import b from './block.css';
import s from './description.css';
import Columns from './columns'
import Tools from '../tools';

const descriptionText = ({text},onTextChange,onDelete,index) => {
  return <div className={`${s["block-description-text-wrapper"]}`}>
    <div className={`${s["block-description-text-close"]}`}>
      <img onClick={()=>{onDelete(index)}} src="https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fui-15.svg?alt=media&token=d59e8719-fe0e-4333-bf3b-5dfaab428eee"/>
    </div>
    <textarea
      onChange={(e)=>{onTextChange(e.target.value,index)}}
      placeholder="Description goes here"
      className={`${s["block-description-text"]} ${s["block-description-text-input"]}`}
      value={text}
      type="text"/>
  </div>
}

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onAdd = this.onAdd.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onAdd() {
    const {texts,onChange} = this.props;
    onChange({texts:texts.concat([{text:""}])});
  }

  onTextChange(value,index) {
    const {texts,onChange} = this.props;
    const newTexts = [].concat(texts);
    newTexts[index] = {text:value};
    onChange({texts:newTexts});
  }

  onDelete(index) {
    const {texts,onChange} = this.props;
    const newTexts = [].concat(texts);
    newTexts.splice(index,1)
    onChange({texts:newTexts});
  }

  render() {
    const {title,description,onToolClick,onChange} = this.props;
    const {texts} = this.props;
    const columns = texts.map((t,i)=>{return descriptionText(t,this.onTextChange,this.onDelete,i)});
    return <Columns
      columns={columns}
      description={description}
      title={title}
      onChange={onChange}
      onAdd={this.onAdd}
      onToolClick={onToolClick}
    />
  }
}

Description.defaultProps = {
  texts:[]
}

export default Description
