import React, { Component } from 'react';
import './css/App.css';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom'
import HomepageContainer from './components/HomepageContainer';
import Projects from './components/Projects'
class App extends Component {
  state = {
    projects: []
  }
  render() {
    return (
      <Router>
        <div className="App">
        <Switch>
          <Route exact path='/' component={HomepageContainer}></Route>
          <Route path='/projects' render={() => <Projects projects={this.state.projects}></Projects>}></Route>
          </Switch>
        </div>

      </Router>
    );
  }
  componentWillMount = () => {
    fetch('/api/projects').then(res => res.json()).then(res => this.setState({ projects: res }));
  }

}

export default App;
