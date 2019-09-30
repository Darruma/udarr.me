const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const minutes = 7.5
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
setInterval(captureData, 1000 * 60 * minutes);
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

router.get('/gym', (req, res) => {

    let data = JSON.parse(fs.readFileSync(path.join(__dirname, "gym_data.json")));
    if (data != undefined)
        res.send({
            success: true,
            data: data
        })
})
module.exports = router;