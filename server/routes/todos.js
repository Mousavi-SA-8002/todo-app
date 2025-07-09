const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { getTodos, createTodo, deleteTodo, toggleTodo } = require('../controllers/todoController')

router.get('/', auth, getTodos)
router.post('/', auth, createTodo)
router.delete('/:id', auth, deleteTodo)
router.patch('/:id/toggle', auth, toggleTodo)

module.exports = router