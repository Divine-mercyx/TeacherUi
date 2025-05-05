import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Profile from './pages/profiles/Profile'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile/setup" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
