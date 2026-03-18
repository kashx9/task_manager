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

