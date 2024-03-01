import express from 'express';
import { createTask, deleteTodo, getTodo, getTodos, updateStatusAndIsCompleted, updateTodo, getAnalytics } from '../controllers/todoController.js';
import { verifyJwt } from '../middlewares/authMiddleware.js';

const router = express.Router();

// router.post('/createTask', verifyJwt, createTask);
router.post('/createTask', verifyJwt, createTask);
router.get('/getTodos', verifyJwt, getTodos);
router.get('/getAnalytics', verifyJwt, getAnalytics);
router.delete('/deleteTodo/:id', verifyJwt, deleteTodo);
router.get('/getTodo/:id', getTodo);
router.post('/updateTodo', verifyJwt, updateTodo);
router.post('/updateStatusAndIsCompleted', verifyJwt, updateStatusAndIsCompleted);

export default router;