import express from 'express'
import {PORT} from './config/env.js'

import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import taskRouter from './routes/task.routes.js'
import notificationRouter from './routes/notification.routes.js'

import cookieParser from 'cookie-parser'
import limiter from './middleware/ratelimit.middleware.js'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.get('/',limiter,(req,res)=>{
    res.send('Welcome to Task simulator')
})
app.use('/api/auth',authRouter)
app.use('/api/users',userRouter)
app.use('/api/tasks',taskRouter)
app.use('/api', notificationRouter)

app.listen(PORT,()=>{
    console.log(`Server started at port: ${PORT}`)
})
