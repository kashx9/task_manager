import prisma from '../config/prismaClient.js'
import { JWT_SECRET,JWT_EXPIRES_IN } from '../config/env.js'
import jwt from 'jsonwebtoken'

export const getAllTasks = async(req,res)=>{
    try {
        const tasks = await prisma.task.findMany()
        res.status(200).json({
            data:tasks
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Server error"
        })
    }
}
        
export const getTask = async(req,res)=>{
    try {
        const taskId = req.params.id 
        const task = await prisma.task.findUnique({
            where:{
                id:taskId
            }
        })
        if(!task){
             return res.status(404).json({
                message: "Task not found"
            })
        }
        return res.status(200).json({
            data:task
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Server error"
        })
    }
}     
    
export const createTask = async(req,res)=>{
    try {
        const {title,status} = req.body
        // const token = req.token
        const userId = req.user.id
        const newTask = await prisma.task.create({
            data:{
                title,
                status,
                creatorId:userId
            }
        })
        res.status(200).json({
            message:"Task created successfully",
            data:newTask
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Server error"
        })
    }
}

export const createTaskforOtherUsers = async(req,res)=>{
    const {taskId,assigneeId} = req.body
    // const token = req.token
    const userId = req.user.id
    try {
        const assignTask = await prisma.task.update({
            where:{
                id:taskId
            },
            data:{
                assigneeId:assigneeId
            }
        })
        res.status(200).json({
            message:"Task assigned successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Server error"
        })
    }
}

export const assignTask = async(req,res)=>{
    const taskId = req.params.id
    const {assigneeId} = req.body
    const userId = req.user.id
    if (!assigneeId) {
    return res.status(400).json({ message: 'assigneeId is required' })
    }
    try {
        const task = await prisma.task.findUnique({
            where:{
                id:taskId
            }
        })
        if (!task) return res.status(404).json({ message: 'Task not found' })
        if(task.creatorId !== userId){
            return res.status(403).json({ message: 'Not allowed to assign this task' })
        }
        const updatedTask = await prisma.task.update({
            where:{
                id:taskId
            },
            data:{
                assigneeId:assigneeId
            }
        })
        res.status(200).json({
            message:"Task assigned successfully",
            data:updatedTask
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Server error" 
        })
    }
}

export const updateTaskStatus = async(req,res)=>{
    const taskId = req.params.id
    const status = req.body.status
    const userId = req.user.id
    try {
        const task = await prisma.task.findUnique({
            where:{
                id:taskId
            }
        })
        if (!task) return res.status(404).json({ message: 'Task not found' })
        if (task.creatorId !== userId && task.assigneeId !== userId) {
      return res.status(403).json({ message: 'Not allowed to update this task' })
        }

    const updatedTask = await prismatask.update({
        where:{
            id:taskId
        },
        data:{
            status:status
        }
    })

    res.status(200).json({
        message:"Task status updated successfully",
        data:updatedTask
    })
    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Server error"
        })
    }
}