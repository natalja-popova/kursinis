import express from "express";
import { adminLogin, adminRegister } from "../controllers/admin.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/admin", adminLogin);
router.post("/admin/register", adminRegister);

router.get("/admin/jwt/validate", auth, (req, res) => {
  res.status(200).json({ message: "JWT is valid" });
});

export default router;
