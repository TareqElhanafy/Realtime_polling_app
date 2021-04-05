const express = require('express')
const router = new express.Router()
const Pusher = require("pusher");

const pusher = new Pusher({
    appId: "1183349",
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: "eu",
    useTLS: true
});
router.get('/', (req, res) => {
    res.send('all votes')
})

router.post('/', (req, res) => {
    pusher.trigger("os-poll", "os-vote", {
        points: 1,
        os: req.body.os
    });
    return res.json({
        success: true,
        message: 'successfully voted!'
    })
})

module.exports = router