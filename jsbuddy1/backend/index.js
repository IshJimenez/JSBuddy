const mongoose = require('mongoose')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/localJSBuddy'


mongoose
    .connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedToplogy: true})
    .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error(err))





app.get('/', (req, res) => {
    res.json({ GreatStart : true})
})
app.listen(PORT)