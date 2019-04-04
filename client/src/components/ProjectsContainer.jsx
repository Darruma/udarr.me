import React, { Component } from 'react';
import '../css/projects.css'
import { Link } from '@reach/router';

class ProjectsContainer extends Component {
    state = { projects: [], status: '' }
    render() {
        return (<div className='projects-container'>
            {this.state.projects.map(project => {
                return (<div className='project-container'>
                    <div className='project'>
                        <div className='project-main'>
                            <p className='project-title'>
                                {project.name}
                            </p>
                            <div className='project-description'>
                            {project.description}
                            </div>
                        </div>


                    </div>
                </div>)
            })}
        </div>);
    }
    componentWillMount() {
        fetch('/api/projects')
            .then(res => res.json())
            .then(p => {
                this.setState({
                    projects: p.data
                })
            }).catch(err => {
                console.log(err);
                this.setState({ status: 'Error, data unavailable' });
            })
    }
}

export default ProjectsContainer;