import React, { Component } from 'react';
import '../css/filters.css';
class Filter extends Component {
	state = { enabled: false };
	render() {
			return (
			<div className={this.state.enabled ? 'filter-enabled flex-row fade-in' : 'filter flex-row fade-in'} onClick={this.addFilter}>
				<span className="filter-text"> {this.props.name}</span>
			
			</div>
		);
	}
	
	addFilter = (e) => {
		e.preventDefault();
		if (!this.state.enabled) {
			e.preventDefault();
			this.setState({ enabled: true});
			this.props.addFilter(this.props.name);
		}
		if (this.state.enabled) {
			this.setState({ enabled: false });
			this.props.removeFilter(this.props.name);
		}

	};
}
export default Filter;
