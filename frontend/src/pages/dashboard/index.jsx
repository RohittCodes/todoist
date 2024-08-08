import Dashboard from './main'

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
    <div className="flex flex-col w-full h-full">
      <Dashboard />
    </div>
  )
}

export default DashboardPage