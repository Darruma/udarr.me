import React, { Component } from 'react';
import './App.css';
import { Router } from "@reach/router"
import TerminalContainer from './components/TerminalContainer'
import ProjectsContainer from './components/ProjectsContainer';
import BlogContainer from './components/BlogContainer'
import './css/homepage.css'
class App extends Component {


    render() {
        return (
            <div className='main-flexbox-row'>
                <div className='left-side'>
                    <div className='homepage-container'>
                        <div className='centered-title'>Umair Darr</div>
                        <TerminalContainer  > </TerminalContainer>
                    </div>
                </div>
                <Router className='right-side'>
                    <BlogContainer path='/blog'></BlogContainer>
                    <ProjectsContainer path='/projects'></ProjectsContainer>
                    <ProjectsContainer path='/projects/:lang'></ProjectsContainer>
                </Router>
            </div >

        );
    }
}

export default App;
