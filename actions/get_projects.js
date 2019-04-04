const fetch_authenticated = require('../actions/fetch_authenticated');
module.exports = () => {
    const fetch_repos = fetch_authenticated('https://api.github.com/users/Darruma/repos').then(res => res.json());
    return fetch_repos.then(repos => {
		let proms = [...repos.map(element => fetch_authenticated(element.languages_url).then(res => res.json())), fetch_repos];
        return Promise.all(proms);
    });
}