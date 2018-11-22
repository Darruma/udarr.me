const express = require('express');
const fs = require('fs');
const projectData = JSON.parse(fs.readFileSync('./projectData.json'))
const router = express.Router();



router.get('/projects', (req, res) => {
	res.send(projectData.projects);
});
router.post('/authenticate', (req, res) => {
	const { passphrase, username } = req.body;

	if (username == 'admin' && passphrase == process.env.PASSWORD) {
		req.session.authenticated = true;
		return res.json({ success: true });
	}
	return res.json({ success: false });
});

router.post('/addproject', (req, res) => {
	const { title, link,image,content } = req.body;
	if (req.session.authenticated) {
		projectData.projects.push({
			title: title,
			link: link,
			image: image,
			content: content,
			id: projectData.projects.length+1
		});
		fs.writeFileSync('./projectData.json', JSON.stringify(projectData,null,2));
		return res.json({ success: true });
	}
	return res.json({ success: false });
});

router.post('/removeproject', (req, res) => {
	if (req.session.authenticated) {
		const { id } = req.body;
		projectData.projects = projectData.projects.filter((e) => e.id != title);
		fs.writeFileSync('./projectData.json', JSON.stringify(projectData,null,2));
		return res.json({ success: true });
	}
	return res.json({ success: false });
});

router.post('/editproject', (req, res) => {
	if (req.session.authenticated) {
		const { title, link, image, content, id } = req.body;
		for(var i = 0; i < projectData.projects.length;i++)
		{
			projectsData.projects[i].title = (title != null) ? title : projectsData.projects[i].title;
			projectsData.projects[i].link =  (link != null) ? link : projectsData.projects[i].link;
			projectsData.projects[i].image = (image != null) ? image : projectsData.projects[i].image;
			projectsData.projects[i].content = (content != null) ? content : projectsData.projects[i].content;
			fs.writeFileSync('./projectData.json', JSON.stringify(projectData,null,2));
			return res.json({ success: true });
		} 
	}
	return res.json({ success: false });
});


router.get('/blog',(req,res)=>{

	return res.json(
	{
		message:'kek'
	})
})
module.exports = router;
