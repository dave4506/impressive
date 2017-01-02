import React, { PropTypes } from 'react';
import b from './block.css';
import s from './project.css';
import Tools from '../tools';

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {projects,title,description} = this.props;
    return <div className={`${b["block"]} ${b["block__standard-width"]} ${s["block-project"]}`} >
      <p className={`${b["block-title"]}`}>{title}</p>
      {projects.map((project,i)=>{
        return <div key={i} className={`${s["block-project-group"]}`}>
          <img className={`${s["block-project-img"]}`} src={project.src}/>
          <div className={`${s["block-project-text-group"]}`}>
            <h1 className={`${s["block-project-title"]}`}>{project.title}</h1>
            <p className={`${s["block-project-text"]}`}>{project.text}</p>
          </div>
        </div>
      })}
      <p className={`${b["block-caption"]}`}>{description}</p>
    </div>
  }
}

export default Project
