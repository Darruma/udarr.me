import React, { Component } from 'react';
import './App.css';
import Login from './components/login';
import Dashboard from './components/dashboard';
import StickyFooter from 'react-sticky-footer';
import arrow from './graphics/arrow_down.jpg';
import cat from './graphics/github.png';
import Projects from './components/projects';
import { HashRouter as Router, Route, Link,Switch} from "react-router-dom";
class App extends Component {

	render() {
		return (
			<Router >
			<div className="App">
				<div className="container-center">
				 <Link to="/login" className="title" style={{ textDecoration: 'none' }}>
					<div className="title">
						Umair Darr
					</div>
					</Link>
					<img src={arrow} onClick={this.scrollToProjects} className="arrow" />
				</div>
				<Switch>
					<Route exact path="/" component={Projects}/>
					<Route path="/login" component={Login} />
				</Switch>
				<StickyFooter
					bottomThreshold={50}
					normalStyles={{
						backgroundColor: '#999999',
						padding: '2rem'
					}}
					stickyStyles={{
						backgroundColor: 'rgba(255,255,255,.8)',
						padding: '2rem'
					}}
				>
					<a href="https://github.com/Darruma">
						<img src={cat} className="cat" />
					</a>
				</StickyFooter>
			</div>
			</Router>

		);
	}
	scrollToProjects = (e) => {
		window.scrollTo({
			behavior: 'smooth',
			top: 860
		});
	};
 
}
export default App;
