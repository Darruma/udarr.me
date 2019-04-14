import React, { Component } from 'react';
import './App.css';
import { Router } from "@reach/router"
import Homepage from './components/Homepage';
import ProjectsContainer from './components/ProjectsContainer';
import BlogContainer from './components/BlogContainer'
class App extends Component {

    state = {
        filesystem: {},
        projects: {}
    }
    render() {
        return (
            <div className='main-flexbox-row'>
                <Router className='left-side' primary={false}>
                    <Homepage path='/*'></Homepage>
                </Router>
                <Router className='right-side'>
                    <BlogContainer path='/blog'></BlogContainer>
                    <ProjectsContainer path='/projects'></ProjectsContainer>
                </Router>
            </div >

        );
    }
}

export default App;
