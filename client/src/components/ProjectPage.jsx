import React from 'react'
import MarkdownRenderer from 'react-markdown/with-html'
const ProjectPage = (props) => {
    return (props.project_data ? <div className="project-page">
        <MarkdownRenderer source={props.project_data.readme}
            escapeHtml={false} />
    </div> : <div></div>)
}
export default ProjectPage

