import React, { Component } from 'react';
import Article from './components/Article'
import Main from './components/main'
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import ProjectsContainer from './components/ProjectsContainer';
class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Main}/>
					<Route path='/projects/:name' component={ArticleContainer}></Route>
					<Route path="/projects" component={ProjectsContainer}/>
					<Route path="/photography" component={ProjectsContainer}/>
				</Switch>
			</Router>

		);
	}
 
}
export default App;
