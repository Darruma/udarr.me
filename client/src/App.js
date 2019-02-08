import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './css/App.css';
import Header from './components/Header'
import Projects from './components/Projects'
import HomepageContainer from './components/HomepageContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
          <div>
          <Header></Header>
              <Switch>
                <Route exact path='/' component={HomepageContainer}></Route>
                <Route path='/projects' component={Projects}></Route>
              </Switch>
          </div>

        </Router>
      </div>
    );
  }
}

export default App;
