import React, { Component } from 'react'
import Project from './Project'
const ProjectsContainer = (props) => {
    let projs = props.projects
    if (props['*']) {
        projs = projs.filter(p => p.languages.includes(props['*']))
    }

    return (<div>
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