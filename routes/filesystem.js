const express = require('express');
const router = express.Router();
const get_repos = require('../actions/get_repos');

function create_directory(name) {
    return {
        name: name,
        type: 'directory',
        children: []
    }
}
function base64_to_ascii(b, name) {
    if (b == undefined) {
        return name
    } else {
        return Buffer.from(b, 'base64').toString('ascii');
    }
}

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
        const repo_data = values[values.length - 1]
        const repos_amount = repo_data.length
        const language_objects = values.slice(repos_amount, values.length - 1)
        let langs = new Set();
        language_objects.forEach(obj => {
            Object.keys(obj).forEach(lang => langs.add(lang))
        })
        langs.forEach(l => {
            fs.children[0].children.push(create_directory(l));
        })
        repo_data.forEach((repo, index) => {
            const readme = base64_to_ascii(values[index].content, repo.name);
            repo_languages = Object.keys(language_objects[index])
            repo_languages.forEach(lang => {
                let folderIndex = fs.children[0].children.findIndex(language_folder => language_folder.name == lang);
                fs.children[0].children[folderIndex].children.push(
                    {
                        name: repo.name,
                        type: 'directory',
                        children: [{
                            name: repo.name + ".md",
                            type: 'file',
                            data: readme
                        }]
                    }

                )
            })
        })
        res.send({
            success: true,
            filesystem: fs,
        })
    }
    )
})

module.exports = router;
