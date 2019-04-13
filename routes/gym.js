const express = require('express');
const exec = require('child_process').exec;
const router = express.Router();
require('dotenv').config()
router.get('/gymamount', (req, res) => {
    const gym_script = exec("sh gym.sh")
    gym_script.stdout.on('data', function (data) {
        res.send(
            {
                success: true,
                amount: data
            }
        )

    });
    gym_script.stderr.on('data', function (data) {
        res.send(
            {
                success: false,
                amount: -1
            }
        )
    });
})
module.exports = router;