const express = require('express');
const fs = require('fs');
const router = express.Router();
const fetch_authenticated = require('../actions/fetch_authenticated');
const blog = JSON.parse(fs.readFileSync('../blog/blog.json'));
const get_projects = require('../actions/get_projects');
router.get('/filesystem', (req, res) => {
    let fs = {
        name: '/',
        type: 'directory',
        children: [
            {
                name: 'projects',
                type: 'directory',
                children: []
            },
            {
                name: 'blog',
                type: 'directory',
                children: []
            },
            {
                name: 'instructions.txt',
                type: 'file',
                data: 'Hello'
            },
        ]
    }
    get_projects.then(values => {
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
        }
        )
        fs.projects.children = projects.map(element => {
            return {
                name:element.name,
                type:'directory',
                children:[
                    {
                        name:element.name + ".txt",
                        type:'file',
                        data:element.description
                    }
                ]
            }
        })
    }
    )


})


module.exports = router;