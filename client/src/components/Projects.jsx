import React, { Component } from 'react';
import '../css/projects.css'
class Projects extends Component {

    render() {
        return (<div className='projects-page'>
            <p className="project-name">projects</p>
            <div className='projects-container '>
                {this.props.projects.map(e => {
                    return (<div key={e.id} className='project'>
                    <div className='projects-image'>
                    <img className='projects-image' src={'/images/' + e.title + '.jpg'}></img>
                    </div>
                    <div className='projects-main'>
                            <p className='project-title'>{e.title}</p>
                        <div className='projects-description'> 
                        <p className='projects-description'> {e.content}</p>
                            </div>
                    </div>
                    </div>)
                })}
            </div>
        </div>);
    }
}

export default Projects;