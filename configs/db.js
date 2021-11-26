const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/' + process.env.DB)
        console.log('connect db successful')
    } catch (error) {
        console.log(error)
    }
}
module.exports = connectDB