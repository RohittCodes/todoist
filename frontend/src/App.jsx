import LoginPage from "./pages/auth/login"
import RegisterPage from "./pages/auth/register"
import DashboardPage from "./pages/dashboard"
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from "react"
import useAuth from "./hooks/use-auth"
import LandingPage from "./pages/landing"
import TaskPage from "./pages/dashboard/task"
import Sidebar from "./components/sidebar"
import Settings from "./pages/dashboard/settings"
import TaskDetails from "./pages/dashboard/components/task-detail"

function App() {
  const { auth } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (auth.token) {
      if (window.location.pathname === "/login" || window.location.pathname === "/register" || window.location.pathname === "/") {
        navigate("/dashboard")
      }
    } else {
      // if the user is not authenticated, redirect to the login page. only if the user is not on the login or register page or the landing page
      if (window.location.pathname !== "/login" && window.location.pathname !== "/register" && window.location.pathname !== "/") {
        navigate("/login")
      }
    }
  }, [auth, navigate])


  if (!auth.token) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    )
  }
  
  return (
    <div className="h-screen bg-neutral-100 flex">
      <Sidebar />
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/dashboard/task/:id" element={<TaskDetails />} />
        <Route path="/dashboard/task" element={<TaskPage />} />
        <Route path="*" element={<div className="flex h-screen bg-neutral-100 w-full">404 Not Found</div>} />
      </Routes>
    </div>
  )
}

export default App
