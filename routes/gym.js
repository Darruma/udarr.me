const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const fetch = require('node-fetch')
function captureData() {
    let data = JSON.parse(fs.readFileSync(path.join(__dirname, "gym_data.json")));
    fetch(`https://kvdb.io/${process.env.KVDB_ID}/gym`)
        .then(response => response.json()).then(res => {
            const dateTime = new Date().toString();
            let gymElement = {}
            gymElement[dateTime] = res
            data.push(gymElement)
            console.log(data)
            fs.writeFileSync(path.join(__dirname, "gym_data.json"), JSON.stringify(data, null, 2));
        })
}
setInterval(captureData, 1000 * 10 * 60);

require('dotenv').config()
router.get('/gymamount', (req, res) => {
    fetch(`https://kvdb.io/${process.env.KVDB_ID}/gym`)
        .then(response => response.json()).then(amount => {
            res.send({
                success: true,
                amount
            })
        }
        )
})
module.exports = router;