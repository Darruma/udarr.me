import React, { Component } from 'react';
import '../css/login.css';
class Login extends Component {
	state = { value: '', username: '', password: '', error: false };
	removeError = (e) =>
	{
		this.setState({error:false})
	}
	render() {
		const err = this.state.error ? (
			<div class="alert">
				<span className="closebtn" onClick={this.removeError}>
					&times;
				</span>
				<strong>Wrong Credentials</strong> Please enter username and password again!
			</div>
		) : (
			''
		);
		return (
			<div className="login">
				<form onSubmit={this.handleSubmit}>
					<div className="inputbox">
						<input
							className="inputdata"
							type="text"
							name="username"
							placeholder="Username"
							onChange={this.handleUsernameChange}
						/>
						
					</div>
					<div className="inputbox ">
						<input
							className="inputdata"
							type="password"
							name="pass"
							placeholder="Password"
							onChange={this.handlePasswordChange}
						/>
						<span className="focus-input100" />
					</div>
					<input className="submit" type="submit" value="Login" />
				</form>
				{err}
			</div>
		);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		postJsonData('/authenticate', { username: this.state.username, passphrase: this.state.password })
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				if (res.success) {
					this.props.changePage('dashboard');
				}
				else
				{
					this.setState({error:true});
				}
			});
	};
	handleUsernameChange = (e) => {
		this.setState({ username: e.target.value });
	};
	handlePasswordChange = (e) => {
		this.setState({ password: e.target.value });
	};
}
function postJsonData(url, data) {
	return fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		},
		body: JSON.stringify(data)
	});
}
export default Login;
