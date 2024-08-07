import DashboardNav from './components/navbar';
import CalendarView from './components/calendar-view';
import TasksView from './components/tasks-view';

const Dashboard = () => {

  return (
    <div className="flex flex-col items-center w-full h-screen">
      <DashboardNav />
      <div className="flex flex-col items-center w-full h-full p-4">
        <TasksView />
        <div className="flex h-1/2 w-full justify-center space-x-4">
          <CalendarView />
        </div>
      </div>
    </div>
  )
}

export default Dashboard