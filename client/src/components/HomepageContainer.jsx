import React, { Component } from 'react';
import Homepage from './Homepage';

class HomepageContainer extends Component {
    state = {
        projects:[],
        errorProjects:false,
        blog:[],
        errorBlog:false
    }
    render() { 
        return (<Homepage projects={this.state.projects} errProject={this.state.errorProjects} errBlog={this.state.errorBlog}>

        </Homepage>  );
    }
    componentWillMount = () =>
    {
        //Fetch data from backend and feed into homepage as props
        fetch('/api/projects/').then(res => res.json())
        .then(res => this.setState({projects:res})).catch(e => this.setState({errorProjects:true}))

         fetch('/api/blog/recent').then(res => res.json()).then(res => this.setState({blog:res})).catch(e => this.setState({errorBlog:true}))
    }
}
 
export default HomepageContainer;