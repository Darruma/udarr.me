const express = require('express');
const fetch = require('node-fetch');
var projectData = []
const router = express.Router();
require('dotenv').config()
getProjects()
setInterval(getProjects,10000)

router.get('/projects', (req, res) => {
	res.send(projectData);
});

function getProjects()
{
	fetch('https://api.github.com/users/Darruma/repos?access_token=' +process.env.PERSONAL_ACCESS_TOKEN).then(res => res.json()).then(res =>
	{
		console.log(res)
		res.forEach(element => {
			var { name } = element
			var { pushed_at } = element
			var { description } = element
			var technologies = [];
			// Search through description for technologies
			var loc = description.indexOf('Technologies')
			if(loc !== -1)
			{
				technologies = description.slice(loc,description.length)
				description = description.slice(description.indexOf('Technologies'))
			}
			fetch(element.languages_url + '?access_token=' +process.env.PERSONAL_ACCESS_TOKEN).then(res => res.json()).then(res =>
			{
				console.log(res)
                technologies = technologies.concat(Object.keys(res))
				projectData = [];
                projectData.push(
					{
						title:name,
						content: description,
						link:element.html_url,
						technologies:technologies,
						id:pushed_at,
						webpage:element.homepage
					}
				)
				projectData.sort((a,b)=>
				{
					return new Date(b.id) - new Date(a.id)
				})
			})
		});
	}
	)
	
}
module.exports = router;
