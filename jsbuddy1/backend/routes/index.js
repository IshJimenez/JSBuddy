const express = require('express')
const router = express.Router();
const Post = require('../models/Post')
const axios = require('axios')
const User = require('../models/Users')
const jwt = require('jsonwebtoken')



router.get(`/user`, verifyToken, async (req, res, next) => {
    //GETTING OUR USER
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.status(403).json(err);
        } else {
            User.findById(authData.user._id).then(user => {
                console.log(user, '?!?!?!?')
                res.status(200).json(user)
            }).catch(err => res.status(500).json(err))

        }
    })
})

router.get(`/Strings`, verifyToken, async (req, res, next) => {

    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        //I'm available via AuthData
        if (err) {
            res.status(403).json(err);
        } else {
            let posts = await Post.find({ userId: authData.user._id })
            res.status(200).json(posts)
        }
    })
})

router.post(`/login`, verifyToken, async(req, res, next) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.status(403).json(err);
        } else {
            let body = req.body
            body.userId = authData.user._id
            let login = await Post.create(body)
            res.status(200).json(login)
        }
    })
})
//     console.log('backenddddd', req.body)
//    let post = await Post.create({post:req.body.login})
//    res.status(200).json(post)
// })

router.get('/getStrings', async(req, res, next) => {
    let Strings = await Post.find({})
    res.status(200).json(Strings)
})

router.post(`/logMeIn`, async(req, res, next) => {

    const tokenId= req.header('X-Google-Token')
    console.log(tokenId)
//     let post = await Post.create({post:req.body.login})
//    res.status(200).json(post)
    if(!tokenId) {
        res.status(401).json({msg: "Missing Google JWT" })
    }

    const googleResponse = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${encodeURI(tokenId)}`)
    const { email, email_verified, picture, given_name, family_name, error_description } = googleResponse.data
    if (!email || error_description) {
        // console.log('email', email, 'err', error_description)
        res.status(400).json({ msg: error_description })
    } else if (!email_verified) {
        res.status(401).json({ msg: 'Email not verified with google' })
    }
    const userData = {
        email, email_verified, picture, given_name, family_name, error_description, googleId: req.body.googleId
    }

    let user = await User.findOne({ email })
    if (!user) {
        user = await User.create(userData)
    }
    jwt.sign({ user }, 'secretkey', { expiresIn: '30min' }, (err, token) => {
        res.status(200).json({ ...user._doc, token });
    })
})
// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization']
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ')
        // Get token from array
        const bearerToken = bearer[1]
        // Set the token
        req.token = bearerToken
        // Next middleware
        next()
    } else {
        // Forbidden
        res.status(403).json({ err: 'not logged in' })
    }
}

module.exports = router

