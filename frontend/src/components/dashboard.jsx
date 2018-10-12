import React, { Component } from 'react';
import '../css/dashboard.css';
class Dashboard extends Component {
	state = { title: '', image: '', link: '', content: '' };
	render() {
		return (<div className="form-style-6">
			<form onSubmit={this.handleSubmit}>
				<input type="text" name="field1" placeholder="Title" onChange={this.handleTitleChange} />
				<input type="text" name="field2" placeholder="link" onChange={this.handleLinkChange} />
				<input type="text" name="field" placeholder="imageurl" onChange={this.handleImageChange} />
				<textarea name="field3" placeholder="Content" onChange={this.handleContentChange} />
				<input type="submit" value="POST" />
			</form>
		</div>);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		postJsonData('/addproject',this.state).then(res=>console.log(res.success));
		this.props.changePage("project");
	};
	handleTitleChange = (e) => {
		this.setState({ title: e.target.value });
	};
	handleLinkChange = (e) => {
		this.setState({ link: e.target.value });
	};
	handleImageChange = (e) => {
		this.setState({ image: '/images/' + e.target.value });
	};
	handleContentChange = (e) => {
		this.setState({ content: e.target.value });
	};
}

function postJsonData(url, data) {
	return fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		},
		body: JSON.stringify(data)
	}).then(res => res.json());
}
export default Dashboard;
