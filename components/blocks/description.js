import React, { PropTypes } from 'react';
import b from './block.css';
import s from './description.css';
import Columns from './columns'

const descriptionText = ({text}) => {
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
    const {texts,description,title} = this.props;
    const columns = texts.map(descriptionText);
    return <Columns
      columns={columns}
      description={description}
      title={title}
    />
  }
}

Description.defaultProps = {
  texts:[]
}

export default Description
