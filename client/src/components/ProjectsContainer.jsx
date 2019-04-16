import React, { useState, useEffect } from 'react';
import Project from './Project'
import '../css/projects.css'
import getProjects from '../actions/get_projects'

const ProjectsContainer = (props) => {
    const [projects, setProjects] = useState([])
    useEffect(() => {
        if (projects.length == 0) {
            getProjects().then(response => {
                setProjects(response.data)
            })
        } else {
            setProjects(projects.filter(project => project.languages.includes(props.lang)))
        }

    }, [props.lang])
    return (<div className='projects-container'>
        <div className='projects-title'>{props.title}</div>
        {projects.map(project => {
            return (<Project name={project.name} key={project.pushed_at} description={project.description}></Project>)
        })}
    </div>);

}

export default ProjectsContainer;