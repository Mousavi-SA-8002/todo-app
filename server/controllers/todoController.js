const Todo = require('../models/Todo')

exports.getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 })
  res.json(todos)
}

exports.createTodo = async (req, res) => {
  const todo = await Todo.create({ text: req.body.text, user: req.user.id })
  res.status(201).json(todo)
}

exports.deleteTodo = async (req, res) => {
  await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id })
  res.json({ message: 'Deleted' })
}

exports.toggleTodo = async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id })
  todo.completed = !todo.completed
  await todo.save()
  res.json(todo)
}