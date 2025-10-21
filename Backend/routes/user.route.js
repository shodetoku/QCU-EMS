import express from "express";
import { getUsers, getUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  authorizeRoles("registrar", "department", "admission", "superadmin"),
  getUsers
);

router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("registrar", "department", "admission", "superadmin"),
  getUser
);

export default router;
