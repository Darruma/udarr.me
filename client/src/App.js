import React, { Component } from 'react';
import './css/App.css';
import { Router, Switch, Route } from 'react-router-dom'
import HomepageContainer from './components/HomepageContainer';

class App extends Component {
  state = {
    projects: []
  }
  render() {
    return (
      <div className="App">
        <Router>
            <Switch>
              <Route path='/'  component={HomepageContainer}></Route>
              <Route path='/projects'  render={()=> <Projects projects={this.state.projects}></Projects> }></Route>

            </Switch>
        </Router>
      </div>
    );
  }
  componentWillMount = () =>
  {
    fetch('/api/projects').then(res => res.json()).then(res=>this.setState({projects:res}));
  }

}

export default App;
