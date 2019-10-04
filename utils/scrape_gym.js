const fetch = require('node-fetch')
const scrape_options = require('../scrape_options')
fetch("https://www.puregym.com/api/members/login/",scrape_options)

fetch('https://www.puregym.com/members/').then(resp => resp.text()).then(res => {
    console.log(res)
}
)