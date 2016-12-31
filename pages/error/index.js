import React, { PropTypes } from 'react';
import g from '../global.css';
import s from './error.css';
import history from '../../core/history';

const errorMap = (error) => {
  switch (error) {
    case "cant_access":
      return {
        bigText:"NOPE",
        smallText:"Bummer. You are accessing a page that isn't yours. If it is, try logging in again."
      }
    case "not_found":
      return {
        bigText:"404",
        smallText:"Looks like that never existed. Shhhhh... "
      }
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
      <div className={`${s["error-page"]}`}>
        <h1>{bigText}</h1>
        <h3>{smallText}</h3>
        <button onClick={()=>{history.push('/')}} >Return to Safety</button>
      </div>
    );
  }
}


export default ErrorPage;
