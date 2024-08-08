import React from 'react'
import TaskWrapper from './task-wrapper'

export const InProgressTask = (
    { task }
) => {
  return (
    <TaskWrapper task={task} />
  )
}

export const CompletedTask = (
    { task }
) => {
  return (
    <TaskWrapper task={task} />
  )
}

export const PendingTask = (
    { task }
) => {
  return (
    <TaskWrapper task={task} />
  )
}