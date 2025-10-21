import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import enrollmentDB from "../database/enrollmentdb.js";

const User = userModel(enrollmentDB);

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = user; // attach user info to req
    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ error: "Unauthorized" });
  }
};
