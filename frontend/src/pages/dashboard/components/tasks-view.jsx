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
  Button,
} from '@nextui-org/react'
import { useState, useCallback } from 'react'
import { today, getLocalTimeZone } from "@internationalized/date";
import { IoEye, IoWarning } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const statusColorMap = {
  completed: "success",
  progress: "warning",
  pending: "danger"
};

const TasksView = () => {
  const renderCell = useCallback((task, columnKey) => {
    const cellValue = task[columnKey];

    switch (columnKey) {
      case "title":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{task.title}</p>
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
      case "endDate":
        const endDate = `${task.endDate.year}-${task.endDate.month}-${task.endDate.day}`;
        const cellEndDate = `${cellValue.year}-${cellValue.month}-${cellValue.day}`;
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellEndDate}</p>
            <p className="text-bold text-sm capitalize text-default-400">{endDate}</p>
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
              <Link to={`/dashboard/tasks/${task.id}`}>
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
    <Table aria-label="Example table with custom cells" className="w-full">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={tasks} className="h-full overflow-y-auto">
        {/* render the tasks in increasing order of their priority, and then by their end date, and display only 4 tasks */}
        {tasks.sort((a, b) => a.priority - b.priority || a.endDate.day - b.endDate.day).slice(0, 4).map((task) => (
          <TableRow key={task.id} className="cursor-pointer hover:bg-neutral-200">
            {columns.map((column) => (
              <TableCell key={column.uid}>
                {renderCell(task, column.uid)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <Link to="/dashboard/tasks" className="w-full mt-2">
        <Button auto className="text-white rounded-lg bg-primary-500 border border-primary-500 space-x-2 w-full">
            <IoEye size={24} />
            View All Tasks
        </Button>
    </Link>
    </div>
  )
}

export default TasksView

// TODO: fetch tasks from the server and display them on the timeline
const columns = [
  { name: "TASKS", uid: "title" },
  { name: "START DATE", uid: "startDate" },
  { name: "END DATE", uid: "endDate" },
  { name: "STATUS", uid: "status" },
  { name: "PRIORITY", uid: "priority" },
  { name: "ACTIONS", uid: "actions" }
];

const tasks = [
  {
    id: 1,
    title: "Task 1",
    startDate: {
      calendar: {
        identifier: "gregory"
      },
      era: "AD",
      year: 2024,
      month: 8,
      day: 7
    },
    endDate: {
      calendar: {
        identifier: "gregory"
      },
      era: "AD",
      year: 2024,
      month: 8,
      day: 7
    },
    status: "completed",
    priority: 8,
  },
  {
    id: 2,
    title: "Task 2",
    startDate: {
      calendar: {
        identifier: "gregory"
      },
      era: "AD",
      year: 2024,
      month: 8,
      day: 7
    },
    endDate: {
      calendar: {
        identifier: "gregory"
      },
      era: "AD",
      year: 2024,
      month: 8,
      day: 7
    },
    status: "completed",
    priority: 8,
  },
  {
    id: 3,
    title: "Task 3",
    startDate: {
      calendar: {
        identifier: "gregory"
      },
      era: "AD",
      year: 2024,
      month: 8,
      day: 23
    },
    endDate: {
      calendar: {
        identifier: "gregory"
      },
      era: "AD",
      year: 2024,
      month: 8,
      day: 23
    },
    status: "progress",
    priority: 10,
  },
  {
    id: 4,
    title: "Task 4",
    startDate: {
      calendar: {
        identifier: "gregory"
      },
      era: "AD",
      year: 2024,
      month: 8,
      day: 24
    },
    endDate: {
      calendar: {
        identifier: "gregory"
      },
      era: "AD",
      year: 2024,
      month: 8,
      day: 24
    },
    status: "pending",
    priority: 4,
  },
  {
    id: 5,
    title: "Task 5",
    startDate: {
      calendar: {
        identifier: "gregory"
      },
      era: "AD",
      year: 2024,
      month: 8,
      day: 24
    },
    endDate: {
      calendar: {
        identifier: "gregory"
      },
      era: "AD",
      year: 2024,
      month: 8,
      day: 24
    },
    status: "pending",
    priority: 1,
  }
];