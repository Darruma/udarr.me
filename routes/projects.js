const express = require('express');
const fetch = require('node-fetch');
var projectData = []
const router = express.Router();
getProjects()
setInterval(updateProjects, 10000)

router.get('/projects', (req, res) => {
	res.send(projectData);
});

function getProjects() {

	fetchRepos().then(res => {
		res.forEach(element => {
			fetch(element.languages_url + '?access_token=' + process.env.PERSONAL_ACCESS_TOKEN).then(res => res.json()).then(res => {
				technologies = Object.keys(res).map(e => e.toLowerCase())
				addProject(element.name, element.description, element.html_url, technologies, element.pushed_at, element.homepage)
				projectData.sort((a, b) => {
					return new Date(b.id) - new Date(a.id)
				})
			})
		});
		
	}
	)
}

function updateProjects() {
	console.log('updating projects')
	fetchRepos().then(res => {
		var names = res.map(e => e.name)
		// projectData = projectData.filter(project => {
			
		// 	if (names.includes(project.title)) {
		// 		return true
		// 	}
		// 	return false
		// })
		// console.log('Filtered Projects')
		// res.forEach(element => {
		// 	fetch(element.languages_url + '?access_token=' + process.env.PERSONAL_ACCESS_TOKEN).then(res => res.json()).then(res => {
		// 		technologies = Object.keys(res).map(e => e.toLowerCase())
		// 		projectData.forEach(e => {
		// 			if (e.name !== element.name) {
		// 				addProject(element.name, element.description, element.html_url, technologies, element.pushed_at, element.homepage)
		// 			}
		// 		})

		// 		projectData.sort((a, b) => {
		// 			return new Date(b.id) - new Date(a.id)
		// 		})
		// 	})
		// })
	})
}
function fetchRepos() {
	return fetch('https://api.github.com/users/Darruma/repos?access_token=' + process.env.PERSONAL_ACCESS_TOKEN).then(res => res.json())
}


function addProject(name, description, html_url, technologies, pushed_at, homepage) {
	projectData.push(
		{
			title: name,
			content: description,
			link: html_url,
			technologies: technologies,
			id: pushed_at,
			webpage: homepage
		}
	)
}


module.exports = router;
