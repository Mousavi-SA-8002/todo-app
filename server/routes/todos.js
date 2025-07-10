const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Todo = require('../models/Todo')
const {
  getTodos,
  createTodo,
  deleteTodo,
  toggleTodo
} = require('../controllers/todoController')

router.get('/', auth, getTodos)

router.post('/', auth, createTodo)

router.delete('/:id', auth, deleteTodo)

router.patch('/:id/toggle', auth, toggleTodo)

router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { new: true }
    )
    res.json(updated)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router