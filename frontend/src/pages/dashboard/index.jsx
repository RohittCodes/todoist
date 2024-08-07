import React from 'react'
import Sidebar from '../../components/sidebar'

const DashboardPage = () => {

  const pathname = window.location.pathname

  return (
    <div className="flex h-screen bg-neutral-100">
      <Sidebar />
      <div className="flex flex-col w-full h-full p-4">
        {pathname === "/dashboard" && (
          <h1 className="text-2xl font-bold text-neutral-800">Dashboard</h1>
        )}
        {pathname === "/dashboard/completed" && (
          <h1 className="text-2xl font-bold text-neutral-800">Completed</h1>
        )}
        {pathname === "/dashboard/in-progress" && (
          <h1 className="text-2xl font-bold text-neutral-800">In Progress</h1>
        )}
        {pathname === "/dashboard/settings" && (
          <h1 className="text-2xl font-bold text-neutral-800">Settings</h1>
        )}
        {pathname !== "/dashboard" && pathname !== "/dashboard/completed" && pathname !== "/dashboard/in-progress" && pathname !== "/dashboard/settings" && (
          <h1 className="text-2xl font-bold text-neutral-800">Page Not Found</h1>
        )}
      </div>
    </div>
  )
}

export default DashboardPage