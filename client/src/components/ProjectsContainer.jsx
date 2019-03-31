import React, { Component } from 'react';
import '../css/projects.css'
import { Link } from '@reach/router';

class ProjectsContainer extends Component {
    state = { projects: [] }
    render() {
        return (<div>
            projects
        </div>);
    }
    componentWillMount() {
        // fetch('/api/projects')
        //     .then(res => res.json())
        //     .then(projects => {
        //         this.setState({
        //             projects: projects
        //         })
        //     })
    }
}

export default ProjectsContainer;