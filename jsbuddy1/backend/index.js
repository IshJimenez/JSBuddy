require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express()


const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/localJSBuddy'


mongoose
    .connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedToplogy: true})
    .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error(err))

app.use(
        cors({
            credentials: true,
            origin: ["http://localhost:3000"] //Swap this with the client url 
    })
);

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());



const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Listening to port ${PORT}`))

app.use('/api', require('./routes'))

// app.listen(PORT)

// app.get('/', (req, res) => {
//     res.json({ GreatStart : true})
// })