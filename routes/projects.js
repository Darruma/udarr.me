const express = require('express');
const router = express.Router();
const fetch_authenticated = require('../actions/fetch_authenticated')

require('dotenv').config()
router.get('/projects', (req, res) => {

    const fetch_repos = fetch_authenticated('https://api.github.com/users/Darruma/repos').then(res => res.json());
    fetch_repos.then(repos => {
        let proms = [...repos.map(element => fetch_authenticated(element.languages_url).then(res => res.json())), fetch_repos];
        return Promise.all(proms);
    }).then(values => {
        var projects = []
        values[values.length - 1].forEach((repo, index) => {
            projects.push({
                name: repo.name,
                description: repo.description,
                link: repo.html_url,
                languages: values[index],
                pushed_at: repo.pushed_at,
                webpage: repo.homepage
            })
        })
        res.send({
            success: true,
            data: projects.sort((a, b) => {
                return new Date(b.pushed_at) - new Date(a.pushed_at)
            })
        })
    })
});


module.exports = router;
