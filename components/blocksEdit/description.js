import React, { PropTypes } from 'react';
import b from './block.css';
import s from './description.css';
import Columns from './columns'
import Tools from '../tools';

const descriptionText = (text) => {
  return <p className={`${s["block-description-text"]}`}>
    {text}
  </p>
}

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {title,description,onToolClick,onChange} = this.props;
    const {texts} = this.props;
    const columns = texts.map(descriptionText);
    return <Columns
      columns={columns}
      description={description}
      title={title}
      onChange={onChange}
      onToolClick={onToolClick}
    />
  }
}

export default Description
