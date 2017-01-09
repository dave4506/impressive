import React, { PropTypes } from 'react';
import g from '../global.css';
import s from './resume.css';
import { connect } from 'react-redux';
import Nav from '../../components/nav/landingNav'
import Footer from '../../components/footer'

import {Block,defaultBlockProps} from '../blocks'
import {APP_STATE,BLOCKS} from '../../core/constants'
import {pullArticle} from '../../core/actions/article'
import {updateAppState} from '../../core/actions/ui'
import history from '../../core/history'

const Article = ({article}) => {
  console.log(article)
  return (
    <div>
      {article.editorState.map((b,i)=>{
        return <Block
          type={b.type}
          edit={false}
          props={Object.assign({},b.props)}
        />
      })}
    </div>
  )
}

class Resume extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  static propTypes = {
  };

  componentWillMount() {
    this.props.updateAppState();
    this.props.pullArticle();
  }

  componentDidMount() {
  }

  render() {
    const {state,props,navOnClick} = this;
    const {article} = props;
    return (
      <div>
        <Nav title="impresssive.co" linksL={[]} linksR={[]}/>
        <div className={`${s["resume"]}`}>
          {(()=>{
            if(article != null);
              if(article.get("uid") != null)
                return <Article
                  article={article.toJS()}/>
          })()}
        </div>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    article:state.get("current").get("article")
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateAppState: () => {
      dispatch(updateAppState(APP_STATE.VIEW))
    },
    pullArticle: () => {
      dispatch(pullArticle())
    }
  }
}

const ResumeRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(Resume)

export default ResumeRedux;
