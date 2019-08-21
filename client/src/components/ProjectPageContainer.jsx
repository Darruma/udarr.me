import React, { Component } from 'react';
import { connect } from 'react-redux'
import ProjectPage from './ProjectPage';

class ProjectPageContainer extends Component {
    state ={

    }
    render() { 
        console.log(this.props)
        return(<ProjectPage data={this.props.projects.find(project => {
            return project.name == this.props.name
        })}></ProjectPage>)
    }
}
const mapStateToProps = (state) => {
    return {
        projects:state.projectReducer.projects
    }
}
export default connect(mapStateToProps,null)(ProjectPageContainer)