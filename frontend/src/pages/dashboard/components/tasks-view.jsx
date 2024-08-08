import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableColumn,
  TableRow,
  Chip,
  Tooltip,
  Button,
} from '@nextui-org/react'
import { useState, useCallback, useEffect } from 'react'
import { IoEye } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../../hooks/use-auth';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const statusColorMap = {
  completed: "success",
  progress: "warning",
  pending: "danger"
};

const TasksView = () => {

  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();
  const userId = auth.user.id;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/${userId}`);
        setTasks(response.data.tasks);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTasks();
  }, []);

  const renderCell = useCallback((task, columnKey) => {
    const cellValue = task[columnKey];

    switch (columnKey) {
      case "title":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400 truncate">{task.description}</p>
          </div>
        );
      case "startDate":
        const startDate = `${task.startDate.year}-${task.startDate.month}-${task.startDate.day}`;
        const cellStartDate = `${cellValue.year}-${cellValue.month}-${cellValue.day}`;
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellStartDate}</p>
            <p className="text-bold text-sm capitalize text-default-400">{startDate}</p>
          </div>
        );
      case "dueDate":
        const dueDate = `${task.dueDate.year}-${task.dueDate.month}-${task.dueDate.day}`;
        const cellDueDate = `${cellValue.year}-${cellValue.month}-${cellValue.day}`;
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellDueDate}</p>
            <p className="text-bold text-sm capitalize text-default-400">{dueDate}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[task.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "priority":
        return (
          <div className="relative flex items-center">
            <Chip className="capitalize" color="primary" size="sm" variant="flat">
              {cellValue}
            </Chip>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Details">
              <Link to={`/dashboard/task/${task._id}`}>
                <IoEye className="cursor-pointer text-lg text-primary-500" />
              </Link>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
  <div className="flex flex-col items-center w-full h-full">
    <Table aria-label="Example table with custom cells" className="w-full h-full">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={tasks} className="h-full overflow-y-auto">
        {
          isLoading ? (
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                  <div className="flex items-center justify-center space-x-2">
                    <AiOutlineLoading3Quarters className="animate-spin text-primary-500" />
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ) : (
            tasks.sort((a, b) => a.priority - b.priority || a.dueDate - b.dueDate).slice(0, 4).map((task) => (
              <TableRow key={task._id}>
                {columns.map((column) => (
                  <TableCell key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                    {renderCell(task, column.uid)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )
        }
      </TableBody>
    </Table>
    <Link to="/dashboard/task" className="w-full mt-2">
        <Button auto className="text-white rounded-lg bg-primary-500 border border-primary-500 space-x-2 w-full">
            <IoEye size={24} />
            View All Tasks
        </Button>
    </Link>
    </div>
  )
}

export default TasksView

const columns = [
  { name: "TASKS", uid: "title" },
  { name: "START DATE", uid: "startDate" },
  { name: "DUE DATE", uid: "dueDate" },
  { name: "STATUS", uid: "status" },
  { name: "PRIORITY", uid: "priority" },
  { name: "ACTIONS", uid: "actions" }
];