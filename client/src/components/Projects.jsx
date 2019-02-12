import React, { Component } from 'react';
import '../css/projects.css'
class Projects extends Component {
    
    render() { 
        return (<div className='projects-page'>
            {this.props.projects.map(e =>
                {
                    return (<div className='project'>
                        {e.title}
                        </div>)
                })}
        </div>);
    }
}
 
export default Projects;