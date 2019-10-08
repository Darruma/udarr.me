const express = require('express');
const router = express.Router();
const get_activity = require('../utils/get_activity')
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch')
const minutes = 7.5
require('dotenv').config();
function captureData() {
    let data = JSON.parse(fs.readFileSync(path.join(__dirname, "gym_data.json")));
    fetch(`https://kvdb.io/${process.env.KVDB_ID}/gym`)
        .then(response => response.json()).then(res => {
            const dateTime = new Date().toString();
            let gymElement = {}
            gymElement[dateTime] = res
            data.push(gymElement)
            fs.writeFileSync(path.join(__dirname, "gym_data.json"), JSON.stringify(data, null, 2));
        })
}

function captureActivity() {
    fs.writeFileSync(path.join(__dirname,"activity.json"),JSON.stringify(get_activity(),null,2))
}
captureActivity()
captureData()
setInterval(captureActivity,1000 * 60 * 60)
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

router.get('/activity',(req,res) => {
   let data = JSON.parse(fs.readFileSync(path.join(__dirname,"activity.json")));
   if(data !=undefined) {
       res.send({
           success:true,
           data:data
       })
   } else {
       res.send({
           success:false
       })
   }
})
module.exports = router;