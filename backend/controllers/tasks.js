import Tasks from '../models/task.js';

export const addTask = async (req, res) => {
    try {
        const {
            title,
            description,
            status,
            priority,
            startDate,
            dueDate,
            startTime,
            endTime,
            category,
            owner,
        } = req.body;
        
        // extract calendar, era, timezone, offset, hour, minute, second, millisecond from startTime and endTime objects
        const { calendar, era, timeZone, offset, hour, minute, second, millisecond } = startTime;
        const startTimeObj = { calendar, era, timeZone, offset, hour, minute, second, millisecond };

        const { calendar: calendar2, era: era2, timeZone: timeZone2, offset: offset2, hour: hour2, minute: minute2, second: second2, millisecond: millisecond2 } = endTime;
        const endTimeObj = { calendar: calendar2, era: era2, timeZone: timeZone2, offset: offset2, hour: hour2, minute: minute2, second: second2, millisecond: millisecond2 };


        const newTask = new Tasks({
            title,
            description,
            status,
            priority,
            startDate,
            dueDate,
            startTime: startTimeObj,
            endTime: endTimeObj,
            category,
            owner
        });

        await newTask.save();

        res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getTasks = async (req, res) => {
    try {
        const { userId } = req.params;
        const { search } = req.query;

        if (search && search !== '' && search !== 'undefined') {
            
            const tasks = await Tasks.find({ owner: userId, title: { $regex: search, $options: 'i' } });
            return res.status(200).json(tasks);
        }

        const tasks = await Tasks.find({ owner: userId });

        res.status(200).json({ tasks, message: 'Tasks fetched successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getTask = async (req, res) => {
    try {
        const { id, userId } = req.params;
        const task = await Tasks.findOne({ _id: id, owner: userId });

        res.status(200).json(task);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateTask = async (req, res) => {
    try {
        const { id, userId } = req.params;
        const task = req.body;

        const updatedTask = await Tasks.findOneAndUpdate({ _id: id, owner: userId }, task, { new: true });

        res.status(200).json(updatedTask);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id, userId } = req.params;

        await Tasks.findOneAndDelete({ _id: id, owner: userId });

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const markTaskAsComplete = async (req, res) => {
    try {
        const { id, userId } = req.params;

        const updatedTask = await Tasks.findOneAndUpdate({ _id: id, owner: userId }, { status: 'completed' }, { new: true });

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const markTaskAsInProgress = async (req, res) => {
    try {
        const { id, userId } = req.params;
        
        const updatedTask = await Tasks.findOneAndUpdate({ _id: id, owner: userId }, { status: 'inprogress' }, { new: true });

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const markTaskAsPending = async (req, res) => {
    try {
        const { id, userId } = req.params;

        const updatedTask = await Tasks.findOneAndUpdate({ _id: id, owner: userId }, { status: 'pending' }, { new: true });

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
