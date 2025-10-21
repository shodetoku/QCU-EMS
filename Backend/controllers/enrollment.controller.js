import bcrypt from "bcrypt";
import enrollmentDB from "../database/enrollmentdb.js";
import userModel from "../models/user.model.js"; 
import { generateTempPassword } from "../utils/generatePassword.util.js";
import { sendEnrollmentEmail } from "../utils/sendEmail.util.js";

// bind the User model to the enrollmentDB connection
const User = userModel(enrollmentDB);

export const enrollStudent = async (req, res) => {
  try {
    const { studentId, firstName, lastName, gender, email } = req.body;

    if (!studentId || !firstName || !lastName || !email) {
      return res.status(400).json({ error: "studentId, firstName, lastName and email are required" });
    }

    //  check for duplicates in this DB
    const exists = await User.findOne({ $or: [{ studentId }, { email }] });
    if (exists) return res.status(409).json({ error: "StudentId or email already exists" });

    //  generate a temp password
    const tempPassword = generateTempPassword(lastName, 10);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const newUser = new User({
      studentId,
      firstName,
      lastName,
      gender,
      email,
      password: hashedPassword,
      firstLogin: true,
    });

    await newUser.save();

    // send enrollment email
    await sendEnrollmentEmail({
      toEmail: email,
      studentId,
      lastName,
      gender,
      tempPassword,
    });

    return res.status(201).json({ message: "Student enrolled and email sent" });
  } catch (err) {
    console.error("Error enrolling student:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
