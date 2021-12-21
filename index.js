require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')
const connectDB = require('./configs/db')
const userRouter = require('./routes/user')
const todoRouter = require('./routes/todo')

const app = new express()

const http = require('http')
const {Server} = require('socket.io')
const server = http.createServer(app)
const io = new Server(server)


app.use(cors())
const {port} = require('./configs')
// db connect and init 
connectDB()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(morgan('dev'))
app.use(passport.initialize())
require('./middlewares/passport')(passport)
// server app
app.get('/', (req, res, next) => {
    return res.sendFile(__dirname + '/index.html')
})
app.use('/user', userRouter)
app.use('/todo', todoRouter)
app.use(async (req, res, next) => {
    const error = new Error('not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    
    res.status(error.status || 500).send({error: error.toString()})
})
// app.listen(port, () => {
//     console.log(`server running in port : ${port}`)
// })

// server socket.io
io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
        // console.log('message: ', msg)
    })
    socket.on('disconnect', () => {
        console.log('a user disconnected')
    })
})

server.listen(port, () => console.log(`server run on ${port}`))