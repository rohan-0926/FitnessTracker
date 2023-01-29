require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

//express app
const app =express()

//middleware
app.use(express.json())

app.use((req, res, next)=>{
    console.log(req.path,req.method)
    next()
})

//routes
app.use('/api/workouts',workoutRoutes)

//connect to db
mongoose.set('strictQuery',true)
mongoose.connect(process.env.MONG_URI)
.then(()=>{
    //listen for requests
    app.listen(process.env.PORT,()=>{
        console.log("Connected to DB & Listening on Port",process.env.PORT)
    })
}).catch((err)=>{
    console.log(err)
})
