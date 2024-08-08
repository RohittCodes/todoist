import Dashboard from './main'

const DashboardPage = () => {

  const pathname = window.location.pathname

  return (
    <div className="flex flex-col w-full h-full">
      <Dashboard />
    </div>
  )
}

export default DashboardPage