import React, { Component } from 'react';
import '../css/projects.css'
import Bounce from 'react-reveal/Bounce';
import { Link } from 'react-router-dom'
class Projects extends Component {

    render() {
        return (<div className='projects-all'>
            <Link to='/projects' className='projects-page-link'>  <p>Projects</p>  </Link>
                <div className='project-container'>
                {this.props.projects.map(element => {
                    return(<div className='project'>
                        <a className='projects-link' href={element.link}>{element.title}</a>
                        </div>)
                })}
                </div>
        </div>);
    }
}

export default Projects;