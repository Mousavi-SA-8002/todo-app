import { Routes, Route, Navigate } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import TodoPage from './pages/TodoPage'

const App = () => {
  const user = localStorage.getItem('token')
  return (
    <Routes>
      <Route path="/" element={user ? <TodoPage /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App