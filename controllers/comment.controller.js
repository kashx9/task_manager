import prisma from '../config/prismaClient.js'

export const createComment = async(req,res)=>{
    const {body,taskId} = req.body
    const userId = req.user.id
    try {
        const comment = await prisma.comment.create({
            data:{
                body:body,
                taskId:taskId,
                userId:userId
            }
        })
        res.status(200).json({
            message:"Comment created successfully",
            data:comment
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Server error"
        })
    }
}