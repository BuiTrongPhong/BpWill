const Todo = require('../models/Todo')
const addTodo = async (req, res, next) => {
    try {
        const todo = new Todo(req.body)
        await todo.save()
        res.status(201).json({message: 'add successfully'})
    } catch (error) {
        next(error)
    }
}
const getTodo = async (req, res, next) => {
    try {
        const todoList = await Todo.find({deleted: false})
        console.log(todoList)
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
module.exports = {
    addTodo,
    getTodo,
    deleteTodo
}