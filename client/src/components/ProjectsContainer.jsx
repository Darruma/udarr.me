import React, { Component } from 'react'
import Projects from './projects';
import '../css/projects.css'

class ProjectsContainer extends Component
{
	state = {
		projects: [],
		renderedProjects: [],
		filters: [ 'HTML', 'CSS', 'Javascript', 'C#',"Python","Java","C"],
		activatedFilters:[]
	};

	render()
	{
		return(<Projects renderedProjects={this.state.renderedProjects} filters={this.state.filters} addFilter={this.addFilter} removeFilter={this.removeFilter} ></Projects>)

	}
	updateFilters = () => {
		this.setState(
			{
				renderedProjects: this.state.projects.filter((element) => {
					if (this.state.activatedFilters.length == 0) {
						return true;
					}
					return this.state.activatedFilters.every((val) => element.technologies.includes(val.toLowerCase()));
				})
			}
		);
	};
	addFilter = (filter) => {
		var newArray = this.state.activatedFilters;
		newArray.push(filter);
		this.setState({ activatedFilters: newArray });
		this.updateFilters();
	};
	removeFilter = (filter) => {
		this.setState(
			{
				activatedFilters: this.state.activatedFilters.filter((element) => {
					return element != filter;
				})
			},
			() => this.updateFilters()
		);
	};

	componentWillMount() {
		fetch('/api/projects')
			.then((res) => res.json())
			.then((res) => this.setState({ projects: res, renderedProjects: res }));
	}

}
export default ProjectsContainer;
