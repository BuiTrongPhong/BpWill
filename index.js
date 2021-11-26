require('dotenv').config()
const express = require('express')
const connectDB = require('./configs/db')
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')
const userRouter = require('./routes/user')

const app = new express()
const {port} = require('./configs')
// db connect and init 
connectDB()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(passport.initialize())
require('./middlewares/passport')(passport)

app.get('/', (req, res, next) => {
    return res.status(200).json({message: 'home'})
})
app.use('/user', userRouter)

app.use((error, req, res, next) => {
    return res.status(500).json({error: error.toString()})
})
app.listen(port, () => {
    console.log(`server running in port : ${port}`)
})