const Todo = require('../models/Todo')
const User = require('../models/User')
const addTodo = async (req, res, next) => {
    try {
        const todo = new Todo(req.body)
        todo.users = req.user._id
        console.log(todo)
        await todo.save()
        res.status(201).json({message: 'add successfully'})
    } catch (error) {
        next(error) 
    }
}
const getTodo = async (req, res, next) => {
    try {
        const todoList = await Todo.find({deleted: false, users: req.user._id}).populate('users')

        return res.status(200).json({todo: todoList})
    } catch (error) {
        next(error)
    }
}
const deleteTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id)
        todo.deleted = true
        await todo.save()
        return res.status(200).json({message: 'delete successfully'})
    } catch (error) {
        next(error)
    }
}
const updateTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body)
        await todo.save()
        console.log(todo)
        return res.status(200).json({message: 'update successfully'})
    } catch (error) {
        next(error)
    }
}
module.exports = {
    addTodo,
    getTodo,
    deleteTodo,
    updateTodo
}