import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../config/prismaClient.js'
import {JWT_SECRET, JWT_EXPIRES_IN} from '../config/env.js'

export const signup = async (req,res)=>{
    const {name,email,password} = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const existingUser = await prisma.user.findUnique({
        where:{
            email:email
        }
    })
    if(existingUser){
        const error = new Error('User with this email already exists')
        error.status = 409
        throw error
    }

    try {
        const user = await prisma.user.create({
            data:{
                name,
                email,
                password:hashedPassword 
            }
        })

    ///const token = jwt.sign({id:user.id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN})
    res.status(201).json({
        message:"User created successfully",
        ///token:token
    })
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

export const signin = async (req,res)=>{
    const {email,password} = req.body

    try {
        const user = await prisma.user.findUnique({
            where:{
                email:email
            }
        })  
        
    if(!user) return res.status(404).json({message:"User not found Please sign up"})

    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid) return res.status(401).json({message:"Invalid password"})

    const token = jwt.sign({id:user.id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN})
    res.status(200).json({
        message:"User signed in successfully",
        token:token,
        user
    })

    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

export const signout = async (req,res)=>{
    const blacklist = []
    let token
    const {button} = req.body
    if(button ==  false){
        res.status(400).json({message:"Logout button not clicked"})
    }

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }
    if(!token){
        res.status(400).json({message:"No token provided"})
    }

    blacklist.push(token)
    res.status(200).json({message:"User signed out successfully"})
}