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
import { useState, useCallback } from 'react'
import { today, getLocalTimeZone } from "@internationalized/date";
import { RiLoaderLine } from 'react-icons/ri';
import { IoEye, IoWarning } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const statusColorMap = {
  completed: "success",
  progress: "warning",
  pending: "danger"
};

const CalendarView = () => {
  let defaultDate = today(getLocalTimeZone());
  let [focusedDate, setFocusedDate] = useState(defaultDate);

  // TODO: fetch task dates from the server
  let taskDates = [
    {
      task: [
        "Task 1",
        "Task 2"
      ],
      date: {
        "calendar": {
          "identifier": "gregory"
        },
        "era": "AD",
        "year": 2024,
        "month": 8,
        "day": 7
      }
    },
    {
      task: [
        "Task 1",
        "Task 2"
      ],
      date: {
        "calendar": {
          "identifier": "gregory"
        },
        "era": "AD",
        "year": 2024,
        "month": 8,
        "day": 14
      }
    },
    {
      task: "Task 3",
      date: {
        "calendar": {
          "identifier": "gregory"
        },
        "era": "AD",
        "year": 2024,
        "month": 8,
        "day": 23
      },
    },
    {
      task: "Task 4",
      date: {
        "calendar": {
          "identifier": "gregory"
        },
        "era": "AD",
        "year": 2024,
        "month": 8,
        "day": 24
      }
    }
  ];

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
    <div className="w-full h-full bg-neutral-100 space-y-4">
      <div className="flex w-full h-full justify-between space-x-4 pt-4">
        <div className="flex items-center h-full">
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
              {/* render the tasks whose end date is same as the focused date */}
              {
                tasks.filter(task => {
                  return task.endDate.year === focusedDate.year && task.endDate.month === focusedDate.month && task.endDate.day === focusedDate.day
                }).map((item) => (
                  <TableRow key={item.id}>
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

export default CalendarView;