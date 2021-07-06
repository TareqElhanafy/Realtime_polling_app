const express = require('express')
const router = new express.Router()
const Pusher = require("pusher");
const Vote = require('../model/vote')
const pusher = new Pusher({
    appId: "1183349",
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: "eu",
    useTLS: true
});
router.get('/', async (req, res) => {
    const votes = await Vote.find({})
    return res.json({
        success: true,
        votes: votes
    })
})

router.post('/', async (req, res) => {
    var vote = await Vote.findOne({ os: req.body.os })
    if (vote) {
        vote.points = await (vote.points + 1)
    } else {
         vote = new Vote({
            os: req.body.os,
            points: 1
        })
    }
     await vote.save()
    console.log(vote);
    pusher.trigger("os-poll", "os-vote", {
        points: vote.points,
        os: vote.os
    });
    return res.json({
        success: true,
        message: 'successfully voted!'
    })
})

module.exports = router
