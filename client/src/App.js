import React, { Component } from 'react';
import './css/App.css';
import { Router , Switch , Route } from 'react-router-dom'
import Projects from './components/Projects'
import HomepageContainer from './components/HomepageContainer';

class App extends Component {
  state = {
    projects: []
  }
  render() {
    return (
      <div className="App">
           <HomepageContainer></HomepageContainer>
      </div>
    );
  }
 
}

export default App;
