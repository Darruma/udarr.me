import React, { Component } from 'react'
import Project from './project'
import Filters from './filters'
import '../css/projects.css'
import { CSSTransitionGroup } from 'react-transition-group'

class Projects extends Component
{
	state = {
		projects: [],
		renderedProjects: [],
		filters: [ 'HTML', 'CSS', 'Javascript', 'Node', 'Express', 'React', 'MongoDB', 'Bootstrap', 'C#', 'Unity',"Python" ],
	};

	render()
	{
		return(
			<div>
		<Filters filters={this.state.filters} addFilter={this.addFilter} removeFilter={this.removeFilter} />
		<CSSTransitionGroup  className="projects" component='div'
		transitionName="projectanimate" transitionEnterTimeout={350}
					transitionLeaveTimeout={350}>
		{
			this.state.renderedProjects.map((element) => {
				return (
					<Project
						title={element.title}
						content={element.content}
						link={element.link}
						technologies={element.technologies}
						image={element.image}
						key={element.id}
						webpage={element.webpage}
					/>
				);
			}
		)}
			</CSSTransitionGroup></div>)

	}
	updateFilters = () => {
		this.setState(
			{
				renderedProjects: this.state.projects.filter((element) => {
					if (this.state.activatedFilters.length == 0) {
						return true;
					}
					return this.state.activatedFilters.every((val) => element.technologies.includes(val));
				})
			},
			() => console.log(this.state.renderedProjects)
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
		fetch('/projects')
			.then((res) => res.json())
			.then((res) => this.setState({ projects: res, renderedProjects: res }));
	}

}
export default Projects;
