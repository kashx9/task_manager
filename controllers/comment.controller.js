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

export const getComments = async(req,res)=>{
    try {
        const comments = await prisma.comment.findMany()
        res.status(200).json({
            message:"Comments fetched successfully",
            data:comments
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Server error"
        })
    }
}

export const getComment = async(req,res)=>{
    const commentId = req.params.id
    try {
        const comment = await prisma.comment.findUnique({
            where:{
                id:commentId
            }
        })
        res.status(200).json({
            message:"Comment fetched successfully",
            data:comment
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Server error"
        })
    }
}

export const deleteComment = async (req, res) => {
  const commentId = req.params.id
  const userId = req.user.id
  try {
    const comment = await prisma.comment.findUnique({ 
        where: { 
        id:commentId 
    } 
})
    if (!comment) return res.status(404).json({ message: 'Comment not found' })
    if (comment.userId !== userId) return res.status(403).json({ message: 'Unauthorized' })
    await prisma.comment.delete({ where: { id } })
    res.status(200).json({ message: 'Comment deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}