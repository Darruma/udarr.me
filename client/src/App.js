import React, { Component } from 'react';
import './App.css';
import { Router, Link } from "@reach/router"
import Homepage from './components/Homepage';
import ProjectsContainer from './components/ProjectsContainer';
import BlogContainer from './components/BlogContainer'
class App extends Component {
  render() {
    return (
      <div className='main-flexbox-row'>
        <Homepage></Homepage>
        <Router>
          <BlogContainer path='/blog'></BlogContainer>
          <ProjectsContainer path='/projects'></ProjectsContainer>
        </Router>
      </div>

    );
  }
}

export default App;
