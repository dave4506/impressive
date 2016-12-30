import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import s from './sidebar.css';
import Chatbar from '../../components/chatbar/'

import {createArticle} from '../../core/actions/current'

class CreateChatbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
  }

  onSubmit(title) {
    this.props.createArticle(title)
  }

  render() {
    const {state,props} = this;
    const {} = props;
    const {} = state;
    return (
      <div className={`${s["chat-bar"]}`}>
        <Chatbar type="standardSingle" props={{onSubmit:this.onSubmit,placeholder:"Title of your latest spell binding peace"}}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createArticle: (title) => {
      dispatch(createArticle(title));
    }
  }
}

const CreateChatbarRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateChatbar)

export default CreateChatbarRedux;
