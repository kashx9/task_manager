import {Router} from 'express'
import { signin, signout, signup } from '../controllers/auth.controller.js'
const authRouter = new Router()

authRouter.post('/signin', signin)

authRouter.post('/signup', signup)

authRouter.post('/signout', signout)

export default authRouter