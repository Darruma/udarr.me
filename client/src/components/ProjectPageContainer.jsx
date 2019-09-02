import React, { Component } from 'react';
import { connect } from 'react-redux'
import ProjectPage from './ProjectPage';

class ProjectPageContainer extends Component {
    
    render() { 
        let project_data =  this.props.projects.find(project => {
            return project.name == this.props.name
        })
      
        return(<ProjectPage project_data={project_data} ></ProjectPage>)
    }
}
const mapStateToProps = (state) => {
    return {
        projects:state.projectReducer.projects
    }
}
export default connect(mapStateToProps,null)(ProjectPageContainer)