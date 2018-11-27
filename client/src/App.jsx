import React, { Component } from 'react';
import Login from './components/Login';
import Projects from './components/Projects';
import Blog from './components/Blog'
import Main from './components/Main'
import BlogPost from './components/BlogPost'
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import BlogEditor from './components/BlogEditor';
class App extends Component {
	render() {
		return (
			<Router >
				<Switch>
					<Route exact path="/" component={Main}/>
					<Route path="/login" component={Login} />
					<Route path="/projects" component={Projects}/>
					<Route exact path="/blog" component={Blog}/>
					<Route path='/blog/:id' component={BlogPost}/>
					<Route path= '/blogeditor' component={BlogEditor}/>
					<Route path="/photography" component={Projects}/>
				</Switch>
			</Router>

		);
	}
 
}
export default App;
