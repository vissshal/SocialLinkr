import express from "express";
const router = express.Router();
import { signin, signup, googleLogin } from "../controllers/user.js";
router.post("/signin", signin);
router.post("/signup", signup);
router.post("/logingoogle", googleLogin);
export default router;
