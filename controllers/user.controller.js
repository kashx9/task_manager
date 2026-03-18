import jwt from 'jsonwebtoken'
import { JWT_SECRET,JWT_EXPIRES_IN } from '../config/env.js'
import prisma from '../config/prismaClient.js'

export const getUsers = async(req,res)=>{
    try {
        const users = await prisma.user.findMany({
            include:{
                createdTasks:true,
                assignedTasks:true
            }
        })

        res.status(200).json({
            message:"Success",
            data:users})
    } catch (error) {
        console.log(error)
    }
}

export const getUser = async(req,res)=>{
    try {
        const user = await prisma.user.findUnique({
            where:{
                id:req.params.id
            },
            include:{
                createdTasks:true,
                assignedTasks:true
            }   
        })

        if(!user){
            return res.status(404).json({
                message:"User does not exist"
            })
        }

        return res.status(200).json({
            message:"Success",
            data:user
        })
    } catch (error) {
        console.log(error)
    }
}