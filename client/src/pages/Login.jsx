import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('username', res.data.user.username)
      navigate('/')
    } catch {
      alert('Invalid credentials')
    }
  }

  return (
    <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 mx-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">🔐 Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="input" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" className="input" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="btn">Login</button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-500">
        Don’t have an account?
        <Link to="/register" className="text-blue-600 hover:underline ml-1">Register</Link>
      </p>
    </div>
  )
}

export default Login