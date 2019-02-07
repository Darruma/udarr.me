const express = require('express');
const router = express.Router();
router.get('/blog/authenticate',(req,res) =>
{
    const { username } = req;
    const { passphrase }  = req;
    if (username == process.env.USERNAME && passphrase == process.env.passphrase)
    {
        req.session.logged_in = true;
    }
})
router.get('/blog/:name',(req,res)=>
{ 
    res.send(
        {
            success:true,
            raw_text:req.params.name
        }
    )
})
module.exports = router;