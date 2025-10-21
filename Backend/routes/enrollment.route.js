import express from "express";
import { enrollStudent } from "../controllers/enrollment.controller.js";

const router = express.Router();

router.post("/enroll", enrollStudent);

export default router;
