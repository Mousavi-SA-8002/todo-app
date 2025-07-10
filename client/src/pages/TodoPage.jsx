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
    <div className="bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 min-h-screen flex items-center justify-center px-4 py-10 font-mono text-white">
      <div className="bg-[#0e1f2f] p-10 rounded-3xl max-w-3xl w-full shadow-[0_0_30px_rgb(0,229,255)]">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-extrabold tracking-wide text-cyan-400 drop-shadow-[0_0_10px_rgb(0,229,255)]">
            🗒️ Your Tasks
          </h2>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 shadow-[0_0_10px_rgb(239,68,68)] px-5 py-2 rounded-lg font-semibold transition duration-300"
          >
            Logout
          </button>
        </div>

        <form onSubmit={addTodo} className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            className="flex-grow p-4 rounded-lg bg-transparent border-2 border-cyan-500 placeholder-cyan-300 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgb(0,229,255)] transition"
            placeholder="What do you want to do?"
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-700 shadow-[0_0_15px_rgb(0,229,255)] px-8 py-4 rounded-lg font-bold uppercase tracking-wider transition-transform active:scale-95"
          >
            Add
          </button>
        </form>

        <ul className="space-y-4 max-h-[400px] overflow-y-auto">
          {todos.map(todo => (
            <li
              key={todo._id}
              className="flex items-center justify-between p-4 border-2 border-cyan-600 rounded-xl shadow-[0_0_20px_rgb(0,229,255)] hover:shadow-[0_0_30px_rgb(0,229,255)] transition cursor-pointer"
            >
              <span
                onClick={() => toggleTodo(todo._id)}
                className={`flex-1 text-xl select-none ${
                  todo.completed
                    ? 'line-through text-cyan-300'
                    : 'text-cyan-200 hover:text-cyan-400'
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="ml-6 bg-red-600 hover:bg-red-700 shadow-[0_0_10px_rgb(239,68,68)] px-4 py-2 rounded-lg font-semibold transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TodoPage