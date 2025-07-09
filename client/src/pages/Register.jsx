import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/auth/register', { username, password })
      navigate('/login')
    } catch {
      alert('User already exists!')
    }
  }

  return (
    <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 mx-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">📝 Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="input" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" className="input" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="btn">Create Account</button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-500">
        Already have an account?
        <Link to="/login" className="text-blue-600 hover:underline ml-1">Login</Link>
      </p>
    </div>
  )
}

export default Register