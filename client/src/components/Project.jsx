import React from 'react'
import links from '../links'
import '../css/project.css'
import { connect } from 'react-redux';
import changeDirectory from '../redux/actions/changeDirectory'
const Project = (props) => {
    console.log(props)
    return (<div className='project-card'>
        <div className='project-container'>
            <p className='project-title'>{props.name}</p>
            <p className='project-description'>{props.description}</p>
            <div className='project-row'>
                {props.languages.map(lang => {
                    return (<div onClick={() => props.changeDirectory(`/projects/${lang}`, `/projects/${lang}`, true)} className='project-lang'>{lang}</div>)
                })}
            </div>
            <div className='project-row source-code'>
                <div onClick={() => window.open(props.link, "_blank")}
                    className='project-github'><img className='project-icon'
                        src={links.GITHUB_LOGO}>
                    </img >
                    <div> Source Code</div></div>
            </div>
        </div>

    </div>)
}
export default connect(null, { changeDirectory })(Project)