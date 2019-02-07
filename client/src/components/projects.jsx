import React, { Component } from 'react'
import Project from './project'
import Filters from './filters'
import '../css/projects.css'

class Projects extends Component {


	render() {
		return (
			<div className='centered-container' >
				<Filters filters={this.props.filters} addFilter={this.props.addFilter} removeFilter={this.props.removeFilter} />
				<div className="projects" component='div'>
					{this.props.renderedProjects.map((element) => {
						return (
							<Project
								title={element.title}
								content={element.content}
								link={element.link}
								technologies={element.technologies}
								image={element.title}
								key={element.id}
								webpage={element.webpage}
							/>)})}
				</div>
			</div>)

	}
}
export default Projects;
