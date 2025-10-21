import mongoose from "mongoose";
import userModel from "../models/user.model.js";
import enrollmentDB from "../database/enrollmentdb.js";

const User = userModel(enrollmentDB)

export const getUsers = async (req, res, next) => {
    //fetch all users from the db
    try {
        const users = await User.find()

        res.status(200).json({
            success: true,
            data: users
        })

    } catch (error) {
        next(error)
    }
}

export const getUser = async (req, res, next) => {
    //fetch specific user by id
    try {
        const user = await User.findById(req.params.id).select('-email')

        if(!user){
            const error = new Error('User not found')
            error.statusCode = 404
            throw error
        }

        res.status(200).json({
            success: true,
            data: user
        })
        
    } catch (error) {
        next(error)
    }
}