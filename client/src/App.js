import React, { Component } from 'react';
import './App.css';
import TerminalContainer from './components/TerminalContainer'
import ProjectsContainer from './components/ProjectsContainer';
import ProjectPage from './components/ProjectPage'
import { Router, Link } from "@reach/router"
import './css/homepage.css'
class App extends Component {


    render() {
        return (
            <div className='main-flexbox'>
                <div className='left-side'>
                    <div className='homepage-container'>
                        <div className='centered-title'>Umair Darr</div>
                        <TerminalContainer > </TerminalContainer>
                    </div>
                </div>
                <div className='right-side'>
                    <Router>

                        <ProjectsContainer path='/projects'></ProjectsContainer>
                        <ProjectPage path='/projects/:lang/:name'></ProjectPage>
                    </Router>
                </div>


            </div >
        );
    }
}

export default App;
