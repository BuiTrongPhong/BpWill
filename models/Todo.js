const mongoose = require('mongoose')
const User = require('./User')
const TodoSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {timestamps: true})
const Todo = mongoose.model('Todo', TodoSchema)
module.exports = Todo