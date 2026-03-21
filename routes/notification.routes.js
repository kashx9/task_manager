import { Router } from 'express'
import { getUserNotifications, markAsRead, markAsUnread } from '../controllers/notification.controller.js'
import { authorize } from '../middleware/auth.middleware.js'

const notificationRouter = new Router()

notificationRouter.get('/users/:id/notifications', authorize, getUserNotifications)
notificationRouter.patch('/:id/read', authorize, markAsRead)
notificationRouter.patch('/:id/unread', authorize, markAsUnread)

export default notificationRouter