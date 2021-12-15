const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const { schema } = require('./Todo')
const Todo = require('./Todo')
const Schema = mongoose.Schema
const UserSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        require: true
    },
    todos: [{
        type: Schema.Types.ObjectId,
        ref: Todo   
    }],
    tokens: [{
        type: String,
        require: true
    }]
}, {timestamps: true}) 
UserSchema.pre('save', async function(next) {
    const password = this.password
    const salt = await bcryptjs.genSalt()
    const hashPassword = await bcryptjs.hash(password, salt)
    this.password = hashPassword
    next();
})
const User = mongoose.model('user', UserSchema)
module.exports = User