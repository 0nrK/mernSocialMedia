import React, { useContext } from 'react'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'
import Register from './pages/register/Register'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import { AuthContext } from './context/AuthContext'

const App = () => {

  const { user } = useContext(AuthContext)

  function RequireAuth() {

    if (!user) {

      return <Navigate to="/" />;
    }
  }


  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route element={<RequireAuth />} >
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        </Route>
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App
