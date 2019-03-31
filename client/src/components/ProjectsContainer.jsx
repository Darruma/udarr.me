import React, { Component } from 'react';
import '../css/projects.css'
import { Link } from '@reach/router';

class ProjectsContainer extends Component {
    state = { projects: [],status:''}
    render() {
        return (<div className='projects-container'>
           projects
        </div>);
    }
    componentWillMount() {
        fetch('/api/projects')
            .then(res => res.json())
            .then(projects => {
                this.setState({
                    projects: projects
                })
            }).catch(err => {
                console.log(err)
            })
    }
}

export default ProjectsContainer;