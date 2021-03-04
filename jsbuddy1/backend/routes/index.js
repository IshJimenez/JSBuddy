const express = require('express')
const router = express.Router();
const Post = require('../models/Post')


router.post(`/login`, async(req, res, next) => {
    console.log('backenddddd', req.body)
   let post = await Post.create({post:req.body.login})
   res.status(200).json(post)
})

router.get('/getStrings', async(req, res, next) => {
    let Strings = await Post.find({})
    res.status(200).json(Strings)
})

router.post(`/logMeIn`, async(req, res, next) => {
    console.log('log me in please...', req.body)
    console.log("HEADERSS", req.headers)
})

module.exports = router

