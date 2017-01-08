import React, { PropTypes } from 'react';
import b from './block.css';
import s from './project.css';
import Tools from '../tools';
import shortid from 'shortid'

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectHashes:[]
    };
    this.onProjectChange = this.onProjectChange.bind(this)
    this.addProject = this.addProject.bind(this)
    this.onUpload = this.onUpload.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  onProjectChange(index) {
    return (change) => {
      const {projects,onChange} = this.props;
      const newProjects = [].concat(projects);
      newProjects.splice(index,1,Object.assign({},newProjects[index],change));
      onChange({projects:newProjects})
    }
  }

  onUpload(index) {
    return (file) => {
      const {onUploadEditorState} = this.props;
      const {projectHashes} = this.state;
      const fileHash = shortid.generate();
      this.setState({projectHashes:projectHashes.concat([fileHash])})
      const custom = (projects,url) => {
        projects[index] = Object.assign({},projects[index],{src:url});
        return projects;
      }
      onUploadEditorState({file,fileHash},"projects","custom",custom);
    }
  }

  onDelete(index) {
    const {projects,onChange} = this.props;
    const newProjects = [].concat(projects);
    newProjects.splice(index,1);
    console.log(newProjects)
    onChange({projects:newProjects})
  }

  addProject() {
    const {projects,onChange} = this.props;
    onChange({projects:projects.concat([{src:"",text:"",title:""}])})
  }

  render() {
    const {projects,title,description} = this.props;
    return <div className={`${b["block"]} ${b["block__standard-width"]} ${s["block-project"]}`} >
      <input
        onChange={(e)=>{onChange({title:e.target.value})}}
        placeholder="Title goes here"
        className={`${b["block-title"]}`}
        value={title}
        type="text" />
      {projects.map((project,i)=>{
        return <div key={i} className={`${s["block-project-group"]}`}>
          <div onClick={()=>{this.refs.fileUploader.click()}} className={`${s["block-project-img-wrapper"]}`}>
            {(()=>{
              if(project.src)
                return <img className={`${s["block-project-img"]}`} src={project.src}/>
              else
                return <img className={`${s["block-project-icon"]}`} src={"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fui-60.svg?alt=media&token=847fc028-1b94-4e3b-bd68-a6e21dc15975"}/>
            })()}
          </div>
          <div className={`${s["block-project-text-group"]}`}>
            <input
              onChange={(e)=>{this.onProjectChange(i)({title:e.target.value})}}
              placeholder="Project title goes here"
              className={`${s["block-project-title"]}`}
              value={project.title}
              type="text" />
            <textarea
              onChange={(e)=>{this.onProjectChange(i)({text:e.target.value})}}
              placeholder="content goes here"
              className={`${s["block-project-text"]}`}
              value={project.text}
              type="text" />
            <input accept="image/*" onChange={(e)=>{this.onUpload(i)(e.target.files[0])}} type="file" ref="fileUploader" style={{display: "none"}} />
          </div>
          <div className={`${s["block-project-close"]}`}>
            <img onClick={()=>{this.onDelete(i)}} src="https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fui-15.svg?alt=media&token=d59e8719-fe0e-4333-bf3b-5dfaab428eee"/>
          </div>
        </div>
      })}
      <input
        onChange={(e)=>{onChange({description:e.target.value})}}
        placeholder="Caption goes here"
        className={`${b["block-caption"]}`}
        value={description}
        type="text" />
      <Tools tools={[{
        title:"DELETE",
        publicTitle:"Delete above block",
        src:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fui-15.svg?alt=media&token=d59e8719-fe0e-4333-bf3b-5dfaab428eee"
      },{
        title:"ADD",
        publicTitle:"Add a icon",
        src:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fui-22.svg?alt=media&token=cb52a56f-d621-4b04-b4b6-d2f141b902e8"
      }]} onClick={(tool)=>{if(tool!="ADD"){onToolClick(tool)}else{this.addProject()}}}/>

    </div>
  }
}

Project.defaultProps = {
  projects:[]
};

export default Project
