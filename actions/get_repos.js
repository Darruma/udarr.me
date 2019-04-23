const fetch_authenticated = require('../actions/fetch_authenticated');
module.exports = async () => {
    try {
        const repos = await fetch_authenticated('https://api.github.com/users/Darruma/repos')
            .then(res => res.json());
        const repos_info = await Promise.all([...repos.map(repo => {
            return fetch('https://api.github.com/repos/Darruma/' + element.name + '/readme')
                .then(res => res.json())
        }), repos.map(repo => repo.languages_url).then(res => res.json)])
        return [...repos_info, repos]
    } catch (err) {
        return []
    }

}
