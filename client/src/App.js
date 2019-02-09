import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './css/App.css';
import Header from './components/Header'
import Projects from './components/Projects'
import HomepageContainer from './components/HomepageContainer';

class App extends Component {
  state ={
    projects:[]
  }
  render() {
    return (
      <div className="App">
      <Router>
          <div>
          <Header></Header>
              <Switch>
                <Route exact path='/' component={HomepageContainer}></Route>
                <Route exact path='/projects' render={()=> <Projects projects={this.state.projects}></Projects>}></Route>
              </Switch>
          </div>

        </Router>
      </div>
    );
  }
  componentWillMount = () =>
  {
    fetch('/api/projects').then(res => res.json())
    .then(res => this.setState({projects:res}))
  }
}

export default App;
