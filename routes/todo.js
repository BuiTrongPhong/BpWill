const express = require('express')
const passport = require('passport')
const router = express.Router()
const todo = require('../controllers/todo')

router.route('/add')
    .post(passport.authenticate('jwt', { session: false }), todo.addTodo)
router.route('/getall')
    .get(passport.authenticate('jwt', { session: false }), todo.getTodo)
router.route('/:id/deletetodo')
    .delete(todo.deleteTodo)
router.route('/:id/updatetodo')
    .put(todo.updateTodo)
module.exports = router