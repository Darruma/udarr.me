import React from 'react'
import '../css/projects.css'

const Project = props => {
    return (<div className='project-container'>
        <div className='project'>
            <div className='project-main'>
                <p className='project-title'>
                    {props.name}
                </p>
                <div className='project-description'>
                    {props.description}
                </div>
            </div>
        </div>
    </div>)
}
export default Project