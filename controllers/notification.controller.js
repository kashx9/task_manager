import prisma from '../config/prismaClient.js'

export const getUserNotifications = async (req, res) => {
  const userId = req.params.id
  if (req.user.id !== userId) {
    return res.status(403).json({ message: 'Unauthorized' })
  }
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })
    res.status(200).json({
      message: 'Notifications fetched',
      data: notifications
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const markAsRead = async (req, res) => {
  const notificationId = req.params.id
  try {
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId }
    })
    if (!notification) return res.status(404).json({ message: 'Notification not found' })
    if (notification.userId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' })
    }
    const updated = await prisma.notification.update({
      where: { id: notificationId },
      data: { read: true }
    })
    res.status(200).json({
      message: 'Notification marked as read',
      data: updated
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const markAsUnread = async (req, res) => {
  const notificationId = req.params.id
  try {
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId }
    })
    if (!notification) return res.status(404).json({ message: 'Notification not found' })
    if (notification.userId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' })
    }
    const updated = await prisma.notification.update({
      where: { id: notificationId },
      data: { read: false }
    })
    res.status(200).json({
      message: 'Notification marked as unread',
      data: updated
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}