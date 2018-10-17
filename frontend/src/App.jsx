import React, { Component } from 'react';
import Login from './components/login';
import Projects from './components/projects';
import Main from './components/main'
import { HashRouter as Router, Route,Switch} from "react-router-dom";
class App extends Component {

	render() {
		return (
			<Router >
				<Switch>
					<Route exact path="/" component={Main}/>
					<Route path="/login" component={Login} />
					<Route path="/projects" component={Projects}/>
					<Route path="/blog" component={Projects}/>
					<Route path="/photography" component={Projects}/>
				</Switch>
			</Router>

		);
	}
 
}
export default App;
