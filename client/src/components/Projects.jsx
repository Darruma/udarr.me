import React, { Component } from 'react';
import '../css/projects.css'
import Bounce from 'react-reveal/Bounce';
class Projects extends Component {

    render() {
        return (<div className='projects-all'>
            <p className='project-title'>Projects</p>
            {this.props.projects.reduce((result, project, index) => {
                const t_index = Math.floor(index / 3);
                if (!result[t_index]) {
                    result[t_index] = []
                }
                result[t_index].push(project)
                return result
            }, []).map(chunk => {
                return (<div className='projects-page'>
                <Bounce top>
                    <div className='projects-container '>
                        {chunk.map(proj => {
                            return (
                                <div className='project'>
                                    <p>{proj.title}</p>
                                </div>
                            )
                        })}
                    </div>
                    </Bounce>
                </div>)

            })}
        </div>);
    }
}

export default Projects;