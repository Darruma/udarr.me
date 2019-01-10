import React, { Component } from 'react';
import '../css/project.css';
class Project extends Component {
	render() {
		return (
			<div className="project fade-in">
				<div className="image">
					<img className="image" src={'/images/'+this.props.image} alt="" />
				</div>
				<div className="content">
					<a href={this.props.webpage}>
						<h3>{this.props.title}</h3>
					</a>
					<p>{this.props.content}</p>
					<a href={this.props.link} className="button alt">
						<p>Code</p>
					</a>
				</div>
			</div>
		);
	}
}

export default Project;
