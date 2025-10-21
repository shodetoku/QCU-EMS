import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import enrollmentDB from "../database/enrollmentdb.js";
import userModel from "../models/user.model.js";

const User = userModel(enrollmentDB);

const signToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "1h" });

export const login = async (req, res) => {
  try {
    const { email, studentId, password, role } = req.body;

    if (!password || !role) {
      return res.status(400).json({ error: "Password and role are required" });
    }

    let user;
    if (role === "student") {
      if (!studentId) {
        return res.status(400).json({ error: "Student ID is required for students" });
      }
      user = await User.findOne({ studentId });
    } else {
      if (!email) {
        return res.status(400).json({ error: "Email is required for this role" });
      }
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.role !== role) {
      return res.status(403).json({ error: "Role mismatch. Please check your login credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signToken({ id: user._id, role: user.role });

    return res.json({
      message: "Login successful",
      token,
      role: user.role,
      firstLogin: user.firstLogin,
      user: {
        adminId: user.adminId,
        studentId: user.studentId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};


export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: "newPassword required (min 6 chars)" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ _id: userId }, { password: hashedPassword, firstLogin: false });

    return res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Change password error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
