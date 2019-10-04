const fetch_authenticated = require('../utils/fetch_authenticated');
module.exports = async () => {
    try {
        const repos = await fetch_authenticated('https://api.github.com/users/Darruma/repos')
            .then(res => res.json());
        const readme_proms = repos.map(repo => {
            return fetch_authenticated('https://api.github.com/repos/Darruma/' + repo.name + '/readme')
        })
        const lang_proms = (repos.map(repo => {
            return fetch_authenticated(repo.languages_url)
        }))
        const repos_info_response = await Promise.all([...readme_proms, ...lang_proms])
        const repos_info_data = await Promise.all(repos_info_response.map(res => res.json()))
        return [...repos_info_data, repos]
    } catch (err) {
        console.log(err)
        return []
    }
}
