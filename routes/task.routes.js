import {Router} from 'express'
import {createTask,createTaskforOtherUsers,getAllTasks,getTask} from '../controllers/task.controller.js'
import { authorize } from '../middleware/auth.middleware.js'

const taskRouter = new Router()

taskRouter.get('/', getAllTasks)

taskRouter.get('/:id', getTask)

taskRouter.post('/create', authorize, createTask)

taskRouter.post('/assign', authorize, createTaskforOtherUsers)

taskRouter.delete('/:id',(req,res)=>{res.send('Deletes a specific task')})

export default taskRouter