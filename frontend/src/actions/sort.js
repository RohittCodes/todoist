export const sortByDueDate = (tasks, status) => {
    
    const compareDates = (a, b) => {
        if (a.year !== b.year) return a.year - b.year;
        if (a.month !== b.month) return a.month - b.month;
        return a.day - b.day;
    };

    const filteredTasks = tasks.filter(task => task.status === status);
    
    const sortedTasks = filteredTasks.sort((a, b) => compareDates(a.dueDate, b.dueDate));

    const updatedTasks = tasks.map(task => {
        if (task.status === status) {
            return sortedTasks.shift();
        } else {
            return task;
        }
    });

    return updatedTasks;
}

export const sortByPriority = (tasks, status) => {
    const filteredTasks = tasks.filter(task => task.status === status)
    
    const sortedTasks = filteredTasks.sort((a, b) => {
        return a.priority - b.priority
    })

    const updatedTasks = tasks.map(task => {
        if (task.status === status) {
            return sortedTasks.shift()
        } else {
            return task
        }
    })

    return updatedTasks
}