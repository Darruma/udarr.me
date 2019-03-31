const fetch = require('node-fetch');
module.exports = (url) => {
    return fetch( url + '?access_token=' + process.env.PERSONAL_ACCESS_TOKEN);
}   