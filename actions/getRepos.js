const fetch = require('node-fetch');

module.exports = () => {
	return fetch('?access_token=' + process.env.PERSONAL_ACCESS_TOKEN);
}