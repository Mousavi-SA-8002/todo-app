import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const TodoPage = () => {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const res = await axios.get('http://localhost:5000/api/todos', {
      headers: { Authorization: `Bearer ${token}` }
    })
    setTodos(res.data)
  }

  const addTodo = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    const res = await axios.post('http://localhost:5000/api/todos', { text }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setTodos([res.data, ...todos])
    setText('')
  }

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setTodos(todos.filter(todo => todo._id !== id))
  }

  const toggleTodo = async (id) => {
    const res = await axios.patch(`http://localhost:5000/api/todos/${id}/toggle`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setTodos(todos.map(todo => todo._id === id ? res.data : todo))
  }

  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8 mx-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">🗒️ Your Tasks</h2>
        <button onClick={logout} className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md">Logout</button>
      </div>

      <form onSubmit={addTodo} className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          className="input flex-grow"
          placeholder="What do you want to do?"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button className="btn sm:w-auto">Add</button>
      </form>

      <ul className="space-y-3 max-h-[400px] overflow-y-auto">
        {todos.map(todo => (
          <li key={todo._id} className="flex items-center justify-between p-3 border rounded-lg shadow-sm hover:shadow-md transition">
            <span
              onClick={() => toggleTodo(todo._id)}
              className={`cursor-pointer text-lg flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo._id)}
              className="text-sm bg-red-400 hover:bg-red-600 text-white px-3 py-1 rounded-md"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoPage