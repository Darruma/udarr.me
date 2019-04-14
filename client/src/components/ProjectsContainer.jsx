import React, { Component } from 'react';
import Project from './Project'
import '../css/projects.css'
import getProjects from '../actions/get_projects'
class ProjectsContainer extends Component {
    state = {
        projects: {}
    }
    render() {
        return (<div className='projects-container'>
            {this.state.projects.map(project => {
                return (<Project name={project.name} description={project.description}></Project>)
            })}
        </div>);
    }

    componentWillMount = () => {
        getProjects.then(response => {
            this.setState({
                projects: response.data
            })
        })
    }
}

export default ProjectsContainer;