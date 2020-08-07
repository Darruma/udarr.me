const express = require('express');
const router = express.Router();
const get_repos = require('../utils/get_repos');
const instructions = ["Welcome to darruma.xyz"," Commands:","> ls : Displays the folder and file names in the current directory", "> cd : Type cd followed by a directory to navigate to it" ,"> clear : type clear to reset the terminal","> cat : type cat follwed by a file to read its output"]
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
            data: instructions.join("\n")
        },
    ]
}
function base64_to_ascii(b, name) {
    if (b == undefined) {
        return name
    } else {
        return Buffer.from(b, 'base64').toString('ascii');
    }
}
router.get('/filesystem', async (req, res) => {
    try {
        const data = await get_repos()
        const repo_data = data[data.length - 1]
        const repos_amount = repo_data.length
        const language_objects = data.slice(repos_amount, data.length - 1)
        const projects = repo_data.map((repo, index) => {
            let langs = Object.keys(language_objects[index])
            langs = langs.map(l => {
                return l == "C#" ? "CSharp" : l
            })
            return {
                name: repo.name,
                description: repo.description,
                link: repo.html_url,
                languages: langs,
                pushed_at: repo.pushed_at,
                webpage: repo.webpage,  
                readme:base64_to_ascii(data[index].content,repo.name)
            }
        })

        const langs = Array.from(new Set(language_objects.reduce((arr, obj) => {
            return [...arr, ...Object.keys(obj)]
        }, [])))
        fs.children[0].children = langs.map(l => {
            if(l == "C#") {
                l = "CSharp"
            }
            return {
                name: l,
                type: 'directory',
                children: []
            }
        })
        repo_data.forEach((repo, index) => {
            const readme = base64_to_ascii(data[index].content, repo.name);
            repo_languages = Object.keys(language_objects[index])
            repo_languages.forEach(lang => {
                if(lang == "C#") {
                    lang = "CSharp"
                }
                const folderIndex = fs.children[0].children.findIndex(language_folder => language_folder.name == lang);
                console.log(folderIndex)
                console.log(lang)
                
                fs.children[0].children[folderIndex].children.push(
                    {
                        name: repo.name,
                        type: 'directory',
                        children: [{
                            name: repo.name + ".md",
                            type: 'file',
                            data: readme
                        }]
                    })
            })
        })
        res.send({
            success: true,
            filesystem: fs,
            projects: projects
        })
    }
    catch (err) {
        console.log(err)
        res.send({
            success: false,
            error: err
        })
    }
})

module.exports = router;
