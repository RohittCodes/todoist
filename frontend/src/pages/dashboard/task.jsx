import { useEffect, useState } from 'react'
import axios from 'axios';
import useAuth from '../../hooks/use-auth';
import SearchTasks from './components/search-tasks';
import { CompletedTask, InProgressTask, PendingTask } from './components/inprogress';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MdOutlineTaskAlt } from 'react-icons/md';
import { RiProgress2Line } from 'react-icons/ri';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button
} from "@nextui-org/react"
import { CgSortAz } from 'react-icons/cg';
import { sortByDueDate, sortByPriority } from '../../actions/sort';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { auth } = useAuth();
  const userId = auth.user.id;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/${userId}`);
        setTasks(response.data.tasks);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col bg-neutral-100 w-full py-2 px-4 space-y-2">
      <SearchTasks />
      <div className="h-[calc(100%-4rem)]">
        <div className="grid grid-cols-3 gap-4 h-full">
          <div className="col-span-1 min-h-[calc(100%-16rem)]">
            <div className="flex justify-between items-center h-12 px-2 space-x-2">
              <div className="flex items-center h-12 px-2 space-x-2">
                <AiOutlineLoading3Quarters className="text-lg text-yellow-500" />
                <h2 className="text-xl font-semibold">Pending Tasks</h2>
              </div>
              <Dropdown>
                <DropdownTrigger>
                  <Button size="sm" className="z-0">
                    Sort by
                    <CgSortAz className="ml-2" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownSection>
                    <DropdownItem onClick={() => {
                      const sortedTasks = sortByDueDate(tasks, "pending");
                      setTasks(sortedTasks)
                    }}>Due Date</DropdownItem>
                    <DropdownItem onClick={() => {
                      const sortedTasks = sortByPriority(tasks, "pending");
                      setTasks(sortedTasks)
                    }}>
                      Priority
                    </DropdownItem>
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className="space-y-4 h-[calc(100%-3rem)] overflow-y-auto px-2 py-2 scrollbar-hide">
              {tasks.filter(task => task.status === "pending").map(task => (
                <PendingTask key={task._id} task={task} loading={loading} />
              ))}
            </div>
          </div>
          <div className="col-span-1 min-h-[calc(100%-16rem)]">
            <div className="flex justify-between items-center h-12 px-2 space-x-2">
              <div className="flex items-center h-12 px-2 space-x-2">
                <RiProgress2Line className="text-lg text-primary-500" />
                <h2 className="text-xl font-semibold">Tasks In Progress</h2>
              </div>
              <Dropdown>
                <DropdownTrigger>
                  <Button size="sm">
                    Sort by
                    <CgSortAz className="ml-2" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownSection>
                    <DropdownItem onClick={() => {
                      const sortedTasks = sortByDueDate(tasks, "inprogress");
                      setTasks(sortedTasks)
                    }}>Due Date</DropdownItem>
                    <DropdownItem onClick={() => {
                      const sortedTasks = sortByPriority(tasks, "inprogress");
                      setTasks(sortedTasks)
                    }}>
                      Priority
                    </DropdownItem>
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className="space-y-4 h-[calc(100%-3rem)] overflow-y-auto px-2 py-2 scrollbar-hide">
              {tasks.filter(task => task.status === "inprogress").map(task => (
                <InProgressTask key={task._id} task={task} loading={loading} />
              ))}
            </div>
          </div>
          <div className="col-span-1 min-h-[calc(100%-16rem)]">
            <div className="flex justify-between items-center h-12 px-2 space-x-2">
              <div className="flex items-center h-12 px-2 space-x-2">
                <MdOutlineTaskAlt className="text-lg text-success-500" />
                <h2 className="text-xl font-semibold">Tasks Completed</h2>
              </div>
              <Dropdown>
                <DropdownTrigger>
                  <Button size="sm">
                    Sort by
                    <CgSortAz className="ml-2" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownSection>
                    <DropdownItem onClick={() => {
                      const sortedTasks = sortByDueDate(tasks, "completed");
                      setTasks(sortedTasks)
                    }}>
                      Due Date
                    </DropdownItem>
                    <DropdownItem onClick={() => {
                      const sortedTasks = sortByPriority(tasks, "completed");
                      setTasks(sortedTasks)
                    }}>
                      Priority
                    </DropdownItem>
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className="space-y-4 h-[calc(100%-3rem)] overflow-y-auto px-2 py-2 scrollbar-hide">
              {tasks.filter(task => task.status === "completed").map(task => (
                <CompletedTask key={task._id} task={task} loading={loading} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskPage