import React, { PropTypes } from 'react';
import s from './styles.css';
import history from '../../core/history';

const errorMap = (error) => {
  switch (error) {
    case "cant_access":
      return {
        bigText:"SORRY CAN'T TOUCH THAT",
        smallText:"Bummer. You are accessing a page that isn't yours. If it is, try logging in again."
      }
      break;
    default:
      return {
        bigText:"Hmm?",
        smallText:"It looks like there is a little confusion. Our bad."
      }
  }
}

class ErrorPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error:""
    }
  }

  static propTypes = {
  };

  componentWillMount() {
    this.setState({error:history.getCurrentLocation().query.err})
  }

  render() {
    const {state,props,navOnClick} = this;
    const {error} = state;
    const {bigText,smallText} = errorMap(error);
    return (
      <div>
        <h1>{bigText}</h1>
        <h3>{smallText}</h3>
      </div>
    );
  }
}


export default ErrorPage;
