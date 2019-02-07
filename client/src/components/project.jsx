import React, { Component } from 'react';
import { Link} from "react-router-dom";
import '../css/project.css';
class Project extends Component {
	render() {
		return (
			<div className="project fade-in">
				<Link to={'projects/' + this.props.webpage}>{this.props.title}</Link>
				<div className='description'>{this.props.content}</div>
			</div>
		);
	}
}

export default Project;
