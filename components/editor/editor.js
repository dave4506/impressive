import React, { PropTypes } from 'react';
import s from './editor.css';
import EditorToolbar from './editorToolbar'
import Chatbar from '../chatbar'

import {
  Editor,
  createEditorState,
} from 'medium-draft';

const icon = (src)=>{
  return ({}) => {
    return (<div className="md-side-button"><img src={require(src)}/></div>)
  }
}

const blockButtons = [{
  label: icon('./icons/list.svg'),
  style: 'unordered-list',
  description: "List"
}]

const sideButtons = [{
  title: 'Image',
  component: icon('./icons/image.svg')
},
{
  title: 'Icon',
  component: icon('./icons/icon.svg')
},
{
  title: 'Project',
  component: icon('./icons/project.svg')
}
]

class EditorComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      editorState: createEditorState(),
      currentTool: null
    };
    this.onChange = (editorState) => this.setState({editorState});
  }

  componentDidMount() {
    this.refs.editor.focus();
  }

  render() {
    const {} = this.props;
    const {editorState,currentTool} = this.state;
    return (
      <div className={`${s["editor"]}`}>
        <div className={`${s["editor-wrapper"]}`}>
          <div className={`${s["editor-core-wrapper"]}`}>
            <input type="text" placeholder="A great story awaits" className={`${s["editor-introduction"]}`}/>
            <Editor
              ref="editor"
              editorState={editorState}
              onChange={this.onChange}
              placeholder="May the force be with you"
              sideButtons={sideButtons}
            />
          </div>
        </div>
        <div className={`${s["editor-chatbar"]}`}>
          <Chatbar type="icon" props={{instruct:"List type",icons:[{src:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fanimals-01.svg?alt=media&token=b135ea55-ef09-4503-b495-1712b1a2fe78",key:"animal"}]}}/>
        </div>
      </div>
    )
  }
}

export default EditorComponent;
