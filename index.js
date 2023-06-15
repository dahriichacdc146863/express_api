// import express
let express = require('express')
let prog = require('./programming')
let mongoose = require('mongoose')
let cors = require('cors')
const req = require('express/lib/request')


// create express app
let app = express()

// enable cors
app.use(cors())

// enable express app to use JSON content-type
app.use(express.json())

// define the port for the API to run
// OR
// define the port where API will be exposed
let PORT = 1234

// setup connection string
let conSt = "mongodb+srv://dahriirman:Airasia123@dhry.sxcedxx.mongodb.net/myyoutube"

// use connection string to connect database
mongoose.connect(conSt)
let db = mongoose.connection

// check if connection success only once
db.once('open', () => {
    console.log("Connected to mongodb database in cloud")
})

// create first API
// http://localhost:1234/
// Here, in 1234 / ->/ is the root endpoint
app.get("/", (request, response) => {
    console.log("request received")
    console.log("GET")
    console.log(request.url)
    response.send("<h1>Hello from Express API server, GET</h1>")
})

// create first API
// http://localhost:1234/
// Here, in 1234 / ->/ is the root endpoint
app.post("/", (request, response) => {
    console.log("request received")
    console.log("POST")
    console.log(request.url)
    response.send("<h1>Hello from Express API server, POST</h1>")
})

// create second API
// http://localhost:1234/get/all
// Here, welcome is endpoint
app.get("/get/all", (request, response) => {
    console.log("request received of type GET")
    console.log(request.url)
    // connect to the mongodb and  get all the doc from programming collection
    prog.find({})
        .then((data) => {
            console.log(data)
            response.json(data)
        })
        .catch((error) => {
            console.log(error)
            response.json(error)
        })

})
// create third API
// http://localhost:1234/get/video/hash-key-of-video
// Here, /get/video/hash-key-of-video is endpoint
app.get("/get/video/:key",(request, response)=> {
    console.log("request received of type GET")
    console.log(request.url)
    console.log("Find video with id")
    console.log(request.params.key)
    // query mongodb database for video with given id
    prog.findById(request.params.key)
        .then((data) => {
            console.log(data)
            response.json(data)
        })
        .catch((error) => {
            console.log(error)
            response.json(error)
        })

})

// create fourth API
// http://localhost:1234/add/video/hash-key-of-video
// Here, /add/video/hash-key-of-video is endpoint
app.post("/add/video",(request, response)=>{
    console.log("request received of type POST")
    console.log(request.url)
    // read the request body from the incoming request
    console.log(request.body)
    // create new programming instance
    let newVideo = new prog()
    console.log(newVideo)
    // newVideo = request.body
    newVideo.videoid = request.body.videoid
    newVideo.likes = request.body.likes
    newVideo.dislikes = request.body.dislikes
    newVideo.title = request.body.title
    console.log(newVideo)
    // save new videos in the database
    newVideo.save()
        .then((data)=>{
            response.json({
                "status":"success",
                "saved":data
            })
        })
        .catch((error) => {
            response.json(error)
        })
})


// define a PORT for API to run
app.listen(PORT, () => {
    console.log("Listening on port:" + PORT)
})
