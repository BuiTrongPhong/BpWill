const express = require('express')

const router = express.Router()
const todo = require('../controllers/todo')
router.route('/add')
    .post(todo.addTodo)
router.route('/getall')
    .get(todo.getTodo)
router.route('/:id/deletetodo')
    .delete(todo.deleteTodo)
module.exports = router