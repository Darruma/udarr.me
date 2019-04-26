import React from 'react'
import '../css/project.css'
import { connect } from 'react-redux';
import changeDirectory from '../actions/changeDirectory'
const Project = (props) => {
    return (<div className='project-card'>
        <div className='project-container'>
            <p className='project-title'>{props.name}</p>
            <p className='project-description'>{props.description}</p>
            <div className='project-tech'>
                {props.languages.map(lang => {
                    return (<div onClick={() => props.changeDirectory(`/projects/${lang}`, `/projects/${lang}`, true)} className='project-lang'>{lang}</div>)
                })}
            </div>
            <div className='project-github'>{props.link}</div>

        </div>

    </div>)
}
export default connect(null, { changeDirectory })(Project)