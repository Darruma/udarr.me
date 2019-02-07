import React, { Component } from 'react';
import Projects from './components/projects';
import Main from './components/main'
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import ProjectsContainer from './components/ProjectsContainer';
class App extends Component {
	render() {
		return (
			<Router >
				<Switch>
					<Route exact path="/" component={Main}/>
					<Route path="/projects" component={ProjectsContainer}/>
					<Route path="/photography" component={Projects}/>
				</Switch>
			</Router>

		);
	}
 
}
export default App;
