// routes/admin.routes.js
import express from "express";
import { createAdmin } from "../controllers/admin.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// only superadmin can create new admin accounts
router.post(
  "/create-admin",
  authMiddleware,
  authorizeRoles("superadmin"),
  createAdmin
);

export default router;
