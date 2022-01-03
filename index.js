const express = require('express')
const mongoose = require('mongoose')
const dotenv = require("dotenv");
const app = express()

dotenv.config();

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// API routes
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

// API initial route
app.get('/', (req, res) => {
    res.json({
        message: 'Oi Express!'
    })
})

mongoose
    .connect(
        process.env.MONGO_URL
        )
    .then(() => {
        console.log("Connected to MongoDB!")
        app.listen(4444)
    })
    .catch((err) => console.log(err))



app.listen(4000)