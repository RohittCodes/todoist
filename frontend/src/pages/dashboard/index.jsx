import React from 'react'
import Sidebar from '../../components/sidebar'
import Dashboard from './main'
import Completed from './completed'
import InProgress from './in-progress'
import Settings from './settings'

const DashboardPage = () => {

  const pathname = window.location.pathname

  // map routes for cleaner code and to avoid the not found page for / and /dashboar, /dashboard/completed and /dashboard/completed/ and others

  const routes = [
    {
      href: "/dashboard",
      href2: "/dashboard/",
      content: <Dashboard />
    },
    {
      href: "/dashboard/completed",
      href2: "/dashboard/completed/",
      content: <Completed />
    },
    {
      href: "/dashboard/in-progress",
      href2: "/dashboard/in-progress/",
      content: <InProgress />
    },
    {
      href: "/dashboard/settings",
      href2: "/dashboard/settings/",
      content: <Settings />
    }
  ]

  return (
    <div className="flex h-screen bg-neutral-100">
      <Sidebar />
      <div className="flex flex-col w-full h-full">
        {
          routes.map((route, index) => {
            if (pathname === route.href || pathname === route.href2) {
              return (
                <div key={index} className="flex items-center justify-center w-full h-full">
                  {route.content}
                </div>
              )
            }
            return null
          })
        }
      </div>
    </div>
  )
}

export default DashboardPage