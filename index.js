require('dotenv').config()
const express = require('express')
const connectDB = require('./configs/db')
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')
const userRouter = require('./routes/user')
const todoRouter = require('./routes/todo')

const app = new express()
app.use(cors())
const {port} = require('./configs')
// db connect and init 
connectDB()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(morgan('dev'))
app.use(passport.initialize())
require('./middlewares/passport')(passport)

app.get('/', (req, res, next) => {
    return res.status(200).json({message: 'home'})
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
app.listen(port, () => {
    console.log(`server running in port : ${port}`)
})