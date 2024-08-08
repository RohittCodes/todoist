import {
  Calendar,
  Divider,
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableColumn,
  TableRow,
  Chip,
  Tooltip,
} from '@nextui-org/react'
import { useState, useCallback, useEffect } from 'react'
import { today, getLocalTimeZone } from "@internationalized/date";
import { IoEye, IoWarning } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/use-auth';
import axios from 'axios';

const statusColorMap = {
  completed: "success",
  progress: "warning",
  pending: "danger"
};

const CalendarView = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { auth } = useAuth();
  const userId = auth.user.id;

  let defaultDate = today(getLocalTimeZone());
  let [focusedDate, setFocusedDate] = useState(defaultDate);
  
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
  
  // task dates from the tasks fetched from the server

  const taskDates = tasks.map(task => {
    return {
      date: task.dueDate
    }
  });

  const isNotATaskDate = (date) => {
    let dateToCheck = {
      "calendar": {
        "identifier": "gregory"
      },
      "era": "AD",
      "year": date.year,
      "month": date.month,
      "day": date.day
    }

    let isTaskDate = taskDates.find(task => {
      return task.date.year === dateToCheck.year && task.date.month === dateToCheck.month && task.date.day === dateToCheck.day
    });

    return !isTaskDate;
  }

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
    <div className="w-full h-full bg-neutral-100">
      <div className="flex w-full h-full justify-between space-x-4 pt-2">
        <div className="flex items-start">
          <Calendar
            value={focusedDate}
            onChange={(date) => setFocusedDate(date)}
            isDateUnavailable={isNotATaskDate}
            className="h-fit"
            topContent={
              <div>
                <div className="px-4 py-2 bg-white rounded-md text-lg font-bold">
                  Tasks Calendar
                </div>
                <Divider />
              </div>
            }
            bottomContent={
              <div>
                <Divider />
                <div className="pl-2 py-2 bg-white rounded-md text-md text-warning-600 flex space-x-2 items-center">
                  <IoWarning size={20} />
                  <p className="text-xs">
                    Tasks are displayed based on their end date
                  </p>
                </div>
              </div>
            }
          />
        </div>
        <div className="flex flex-col items-center w-full h-[360px]">
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
                tasks.filter(task => {
                  return task.dueDate.year === focusedDate.year && task.dueDate.month === focusedDate.month && task.dueDate.day === focusedDate.day
                }).map((item) => (
                  <TableRow key={item._id}>
                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

const columns = [
  { name: "TASKS", uid: "title" },
  { name: "START DATE", uid: "startDate" },
  { name: "DUE DATE", uid: "dueDate" },
  { name: "STATUS", uid: "status" },
  { name: "PRIORITY", uid: "priority" },
  { name: "ACTIONS", uid: "actions" }
];

export default CalendarView;