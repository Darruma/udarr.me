import React, { Component } from 'react';
import Login from './components/Login';
import Projects from './components/Projects';
import Main from './components/Main'
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import Editor from './components/Editor';
class App extends Component {
	render() {
		return (
			<Router >
				<Switch>
					<Route exact path="/" component={Main}/>
					<Route path="/login" component={Login} />
					<Route path="/projects" component={Projects}/>
					<Route path= '/editor/:id?' component={Editor}/>
					<Route path="/photography" component={Projects}/>
				</Switch>
			</Router>

		);
	}
 
}
export default App;
