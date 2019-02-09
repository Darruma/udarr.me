import React, { Component } from 'react';
import Project from './Project'
import '../css/projects.css'
class Projects extends Component {
    state = {  }
    render() { 
        return (<div className='centered-container'>
            {this.props.projects.map(e => {
                return(<Project title={e.title} content={e.content} ></Project>)
            })}
        </div>  );
    }
}
 
export default Projects;