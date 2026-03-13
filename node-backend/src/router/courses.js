import express from "express";
import { RegistrationEmail } from "../controllers/courses.js";
const router = express.Router();
router.post("/courses/register", RegistrationEmail);
export default router;
