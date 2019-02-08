import React, { Component } from 'react';
import Homepage from './Homepage';

class HomepageContainer extends Component {
    state = {
        projects:[],
        blog:[]
    }
    render() { 
        return (<Homepage projects={this.state.projects}>

        </Homepage>  );
    }
    componentWillMount = () =>
    {
        //Fetch data from backend and feed into homepage as props
        fetch('/api/projects/recent').then(res => res.json())
        .then(res => this.setState({projects:res}))
    }
}
 
export default HomepageContainer;