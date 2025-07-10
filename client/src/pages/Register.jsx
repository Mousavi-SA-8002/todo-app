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
    <div className="bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 min-h-screen flex items-center justify-center px-4 py-10 font-mono text-white">
      <div className="bg-[#0e1f2f] p-10 rounded-3xl max-w-md w-full shadow-[0_0_30px_rgb(0,229,255)]">
        <h2 className="text-3xl font-extrabold text-cyan-400 drop-shadow-[0_0_10px_rgb(0,229,255)] mb-8 text-center">
          📝 Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            className="input p-4 rounded-lg bg-transparent border-2 border-cyan-500 placeholder-cyan-300 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgb(0,229,255)] transition w-full"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="input p-4 rounded-lg bg-transparent border-2 border-cyan-500 placeholder-cyan-300 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgb(0,229,255)] transition w-full"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="btn w-full bg-cyan-600 hover:bg-cyan-700 shadow-[0_0_15px_rgb(0,229,255)] py-4 rounded-lg font-bold uppercase tracking-wide transition-transform active:scale-95"
          >
            Create Account
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-cyan-300">
          Already have an account?
          <Link to="/login" className="text-cyan-400 hover:underline ml-1 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register