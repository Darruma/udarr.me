const fetch_authenticated = require('../actions/fetch_authenticated');
module.exports = () => {
    const fetch_repos = fetch_authenticated('https://api.github.com/users/Darruma/repos').then(res => res.json());
    return fetch_repos.then(repos => {
        let readme_proms = repos.map(element => fetch_authenticated('https://api.github.com/repos/Darruma/' + element.name + '/readme').then(res => res.json()))
        let proms = [...repos.map(element => fetch_authenticated(element.languages_url).then(res => res.json())), fetch_repos];
        return Promise.all(readme_proms.concat(proms));
    });
}
