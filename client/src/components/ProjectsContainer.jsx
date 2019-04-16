import React, { useState, useEffect } from 'react';
import Project from './Project'
import '../css/projects.css'
import getProjects from '../actions/get_projects'

const ProjectsContainer = () => {
    const [projects, setProjects] = useState([])
    console.log("projects container loaded")
    useEffect(() => {
        getProjects().then(response => setProjects(response.data))
    }, [])

    return (<div className='projects-container'>
        {projects.map(project => {
            return (<Project name={project.name} description={project.description}></Project>)
        })}
    </div>);

}

export default ProjectsContainer;