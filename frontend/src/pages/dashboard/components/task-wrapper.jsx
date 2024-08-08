import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Chip,
} from '@nextui-org/react'
import { IoEllipsisVertical, IoEye } from 'react-icons/io5';
import { MdPendingActions, MdOutlineTaskAlt } from 'react-icons/md';
import { CgGoogleTasks } from 'react-icons/cg';
import {
  Link
} from "react-router-dom";
import DeleteTask from '../modals/delete-task';
import EditTask from '../modals/edit-task';
import MarkInProgress from '../modals/mark-inprogress';
import MarkComplete from '../modals/mark-complete';
import MarkPending from '../modals/mark-pending';

const statusColorMap = {
  completed: "success",
  progress: "warning",
  pending: "danger"
};

const TaskWrapper = (
  { task, loading }
) => {

  const { day, month, year } = task.dueDate;
  const dueDate = new Date(year, month, day);
  const { day: startDay, month: startMonth, year: startYear } = task.startDate;
  const startDate = new Date(startYear, startMonth, startDay);

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <Card className="w-full max-h-96 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Chip color="success" size="sm" variant="flat">
              {task.priority}
            </Chip>
            <Chip color={statusColorMap[task.status]} size="sm" variant="flat">
              {task.status}
            </Chip>
          </div>
          <div className="flex items-center gap-2">
            <EditTask task={task} />
            <Popover placement="bottom" showArrow>
              <PopoverTrigger>
                <Button isIconOnly>
                  <IoEllipsisVertical className="text-lg text-primary-500" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-36 space-y-1 p-2">
                <DeleteTask task={task} />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <p className="text-md">{task.title}</p>
            <p className="text-sm text-default-400">{task.description}</p>
          </div>
          <div className="flex justify-end gap-2">
            {
              task.status === "completed" && (
                <div className="flex items-center gap-2">
                  <MarkInProgress task={task} />
                  <MarkPending task={task} />
                </div>
              )
            }
            {
              task.status === "inprogress" && (
                <MarkComplete task={task} />
              )
            }
            {
              task.status === "pending" && (
                <MarkInProgress task={task} />
              )
            }
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-2">
            <Chip color="default" size="sm" variant="flat">
              {startDate.toDateString()}
            </Chip>
            <Chip color="default" size="sm" variant="flat">
              {dueDate.toDateString()}
            </Chip>
          </div>
          <Link to={`/dashboard/task/${task._id}`}>
            <div className="text-blue-500 rounded-full h-6 w-6 flex items-center justify-center bg-gray-100">
              <IoEye className="text-lg text-primary-500" size={16} />
            </div>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

export default TaskWrapper