const express = require('express');
const fs = require('fs');
const router = express.Router();
const fetch_authenticated = require('../actions/fetch_authenticated');
const get_repos = require('../actions/get_repos');
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
    get_repos().then(values => {
        var projects = []
        let repos_amount = values[values.length -1]
        values[values.length - 1].forEach((repo, index) => {
            projects.push({
                name: repo.name,
                description: repo.description,
                link: repo.html_url,
                languages: values[index+repos_amount],
                pushed_at: repo.pushed_at,
                webpage: repo.homepage
            })
        }
        )
        fs.children[0].children = projects.map((element, index)  => {
                let base64_txt = values[index].content
                let txt;
                if (base64_txt != undefined) {
                      txt = Buffer.from(values[index].content,'base64').toString('ascii')
                } else {
                    console.log("undefined")
                    txt = element.name
                }
                
                return {
                name:element.name,
                type:'directory',
                children:[
                    {
                        name:element.name + ".txt",
                        type:'file',
                        data:txt
                    }
                ]
            }
        })
res.send({
        success:true,
        filesystem:fs
     })
    }
     
    )

})

module.exports = router;
