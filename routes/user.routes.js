import {Router} from 'express'
import { getUser, getUsers } from '../controllers/user.controller.js'

const userRouter = new Router()

userRouter.get('/', getUsers)

userRouter.get('/:id', getUser)

export default userRouter