import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class Project extends Component {

    render() { 
        return (<div className="project" key={this.props.id}>
        <Link to={"/projects/" + this.props.title} className="project-title link">
            {this.props.title}
        </Link>
        <p className="project-description">
            - {this.props.content}
        </p>
    </div> );
    }
}
 
export default Project;