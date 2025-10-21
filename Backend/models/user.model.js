import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: false,
    sparse: true,
    unique: true,
    maxlength: 9
  },
  adminId: {
    type: String,
    required: false,
    sparse: true,
    unique: true,
    maxlength: 20
  },
  firstName: {
    type: String,
    required: [true, 'User First Name is required!'],
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: [true, 'User Last Name is required!'],
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "LGBTQ+++"],
    default: "Male"
  },
  email: {
    type: String,
    required: [true, 'User email is required!'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: [true, 'User Password is required!'],
    minlength: 8,
  },
  firstLogin: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    enum: ["student", "registrar", "department", "admission", "superadmin"],
    default: "student",
  },
}, { timestamps: true });

export default (connection) => {
  return connection.model("User", userSchema);
};
