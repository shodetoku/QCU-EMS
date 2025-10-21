import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import enrollmentDB from "../database/enrollmentdb.js";
import { sendAdminEmail } from "../utils/sendEmail.util.js";
import { generateTempPassword } from "../utils/generatePassword.util.js";

const User = userModel(enrollmentDB)

export const createAdmin = async (req, res, next) => {
    try {
        const { adminId, firstName, lastName, email, role} = req.body

        const allowedRoles = ['registrar', 'department', 'admission']
        if(!allowedRoles){
            return res.status(400).json({ error: "Invalid Role"})
        }

        const exists = await User.findOne({ email })
        if(exists) {
            return res.status(409).json({ error: 'Email already exists!'})
        }
        const tempPassword = generateTempPassword(lastName, 10);
        const hashedPassword = await bcrypt.hash(tempPassword, 10)

        const newAdmin = new User({
            adminId,
            firstName,
            lastName,
            password: hashedPassword,
            email,
            firstLogin: true,
            role
        })

        await newAdmin.save()

        // send enrollment email
        await sendAdminEmail({
        toEmail: email,
        adminId,
        lastName,
        role,
        tempPassword,
        });

         return res.status(201).json({
            message: `${role} account created successfully`,
            admin: {
                id: newAdmin._id,
                firstName: newAdmin.firstName,
                lastName: newAdmin.lastName,
                email: newAdmin.email,
                role: newAdmin.role,
            },
        });

    } catch (error) {
        console.error("Create admin error:", error);
        next(error)
    }
}