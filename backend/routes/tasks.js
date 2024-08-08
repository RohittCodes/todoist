import express from 'express';
import { addTask, getTasks, getTask, updateTask, deleteTask, markTaskAsComplete, markTaskAsInProgress, markTaskAsPending } from '../controllers/tasks.js';

const router = express.Router();

router.post('/', addTask);
router.get('/:userId', getTasks);
router.get('/:userId/:id', getTask);
router.put('/:userId/:id', updateTask);
router.delete('/:userId/:id', deleteTask);

router.put('/:userId/:id/complete', markTaskAsComplete);
router.put('/:userId/:id/inprogress', markTaskAsInProgress);
router.put('/:userId/:id/pending', markTaskAsPending);

export default router;