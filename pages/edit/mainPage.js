import React, { PropTypes } from 'react';
import s from './mainPage.css';
import Nav from '../../components/nav/nav'
import Dropdown from '../../components/nav/dropdown'
import Editor from '../../components/editor/editor'
import View from '../../components/editor/view'
import Image from '../../components/image/image'
import Chatbar from './chatbar'
import {connect} from 'react-redux';
import {updateAppState} from '../../core/actions/ui';
import {deleteArticle,createArticle,deleteDraft,createDraft} from '../../core/actions/current';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
    const {
      appState,
      articles,
      drafts,
      current,
      deleteArticle,
      deleteDraft,
      updateAppState,
      createDraft} = this.props
    const currentArticle = current.get("article");
    const currentDraft = current.get("draft");
    console.log("@MainPage",appState)
    return (
      <div className={`${s["main-page"]}`}>
        <div className={`${s["main-editor"]}`}>
          {(()=>{
            if(currentDraft.toJS().editorState != null)
              if(appState=="VIEW") {
                  return <View createDraft={createDraft} updateAppState={updateAppState} deleteDraft={deleteDraft} deleteArticle={deleteArticle} article={currentArticle.toJS()} draft={currentDraft.toJS()} Chatbar={Chatbar}/>
              } else {
                  return <Editor createDraft={createDraft} updateAppState={updateAppState} deleteDraft={deleteDraft} deleteArticle={deleteArticle} article={currentArticle.toJS()} draft={currentDraft.toJS()}/>
              }
          })()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    current:state.get("current"),
    articles:state.get("article").get("articles"),
    drafts:state.get("draft").get("drafts")
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteArticle: () => {
      dispatch(deleteArticle());
    },
    deleteDraft: () => {
      dispatch(deleteDraft());
    },
    createArticle: (title) => {
      dispatch(createArticle(title));
    },
    updateAppState: (state) => {
      dispatch(updateAppState(state));
    },
    createDraft: () => {
      dispatch(createDraft());
    }
  }
}

const MainPageRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage)

export default MainPageRedux

/*
<Dropdown defaultAccordion={true} links={["flex","this is me","wow so cool!","deamn"]}/>
*/
