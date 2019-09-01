const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')
require('dotenv').config()
router.get('/gymamount', (req, res) => {
   fetch(`https://kvdb.io/${process.env.KVDB_ID}/gym`)
   .then(response => response.json()).then(amount => {
       res.send({
           success:true,
           amount
       })
   }
   )
})
module.exports = router;