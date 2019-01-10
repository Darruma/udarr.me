const express = require('express');
const projectData = {}
const router = express.Router();

router.get('/projects', (req, res) => {
	res.send(projectData.projects);
});


module.exports = router;
