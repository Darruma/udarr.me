const express = require('express');
const router = express.Router();
const fetch_authenticated = require('../actions/fetch_authenticated')
require('dotenv').config()


router.get('/projects', async (req, res) => {
    try {
        const fetch_repos_response = await fetch_authenticated('https://api.github.com/users/Darruma/repos')
        const fetch_repos_data = await fetch_repos_response.json()
        console.log(fetch_repos_data);
        const languages_response = await Promise.all(fetch_repos_data.map(repo => fetch_authenticated(repo.languages_url)))
        const languages_data = await Promise.all(languages_response.map(res => res.json()))
        res.send({
            success: true,
            data: fetch_repos_data.map((repo, index) => ({
                name: repo.name,
                description: repo.description,
                link: repo.html_url,
                languages: Object.keys(languages_data[index]),
                pushed_at: repo.pushed_at,
                webpage: repo.webpage
            }))
        })
    }
    catch (err) {
        res.send({
            success: false,
            data: 'Server Error'
        })
    }

})

module.exports = router;
