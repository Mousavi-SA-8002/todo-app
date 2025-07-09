const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body
    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ username, password: hashed })
    res.status(201).json({ message: 'User created' })
  } catch (err) {
    res.status(400).json({ error: 'User already exists' })
  }
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) return res.status(400).json({ error: 'Invalid credentials' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.json({ token, user: { id: user._id, username: user.username } })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}