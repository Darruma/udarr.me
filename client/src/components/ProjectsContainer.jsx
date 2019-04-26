import React, { Component } from 'react'
import Project from './Project'
import '../css/projects.css'
const ProjectsContainer = (props) => {
    let projs = props.projects
    if (props['*']) {
        projs = projs.filter(p => p.languages.includes(props['*']))
    }

    return (<div className='projects'>
        {projs.map(project => <Project
            name={project.name}
            description={project.description}
            link={project.html_url}
            languages={project.languages}
            key={project.pushed_at}
            webpage={project.webpage}>
        </Project>)

        }
    </div>)
}
export default ProjectsContainer