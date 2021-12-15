const {model, Schema} = require('mongoose')
const TodoSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})
const Todo = model('todo', TodoSchema)
module.exports = Todo