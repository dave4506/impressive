import React, { PropTypes } from 'react';
import s from './mainPage.css';
import Nav from '../../components/nav/nav'
import Dropdown from '../../components/nav/dropdown'
import Editor from '../../components/editor/editor'
import View from '../../components/editor/view'
import Image from '../../components/image/image'
import Chatbar from './chatbar'

class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {appState} = this.props
    console.log("appstate",appState);
    return (
      <div className={`${s["main-page"]}`}>
        <div className={`${s["main-editor"]}`}>
          {(()=>{
            if(appState=="VIEW")
              return <View Chatbar={Chatbar}/>
            else
              return <Editor/>
          })()}
        </div>
      </div>
    )
  }
}

export default MainPage

/*
<Dropdown defaultAccordion={true} links={["flex","this is me","wow so cool!","deamn"]}/>
*/
