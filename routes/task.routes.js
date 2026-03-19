import {Router} from 'express'
import {createTask,createTaskforOtherUsers,getAllTasks,getTask} from '../controllers/task.controller.js'
import { authorize } from '../middleware/auth.middleware.js'
import { createComment, getComments, getComment, deleteComment } from '../controllers/comment.controller.js'

const taskRouter = new Router()

// Task specific routes
taskRouter.get('/', getAllTasks)

taskRouter.get('/:id', getTask)

taskRouter.post('/create', authorize, createTask)

taskRouter.post('/assign', authorize, createTaskforOtherUsers)

// Comment specific routes
taskRouter.get('/comments', getComments)

taskRouter.get('/comments/:id', getComment)

taskRouter.post('/comments/create', createComment)

taskRouter.delete('/comments/:id', deleteComment)

export default taskRouter