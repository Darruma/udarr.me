import React, { Component } from 'react';
import '../css/filters.css'
import Filter from './Filter'
class Filters extends Component {
	state = { enabled: false };
	render() {
		return (
			<div className="filter-container flex-row">
				{this.props.filters.map((element,id) => {
					return(<Filter name={element} addFilter={this.props.addFilter} key={id} removeFilter={this.props.removeFilter} />);
				})}
			</div>
		);
	}
}

export default Filters;
