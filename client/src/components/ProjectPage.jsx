import React from 'react'

const ProjectPage = (props) => {
    return (props.project_data ? <div>
        {props.project_data.name}
    </div> : <div></div>)
}
export default ProjectPage