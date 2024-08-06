import LoginPage from "./pages/auth/login"
import RegisterPage from "./pages/auth/register"
import DashboardPage from "./pages/dashboard"
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from "react"
import useAuth from "./hooks/use-auth"
import LandingPage from "./pages/landing"

function App() {
  const { auth } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (auth.token) {
      navigate("/dashboard")
    } else {
      // Navigate to login only if on dashboard route
      if (window.location.pathname === "/dashboard") {
        navigate("/login")
      }
    }
  }, [auth, navigate])

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  )
}

export default App
