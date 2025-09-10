import { login, register } from "../controllers/auth.js";
import express from "express";
// handle the specific routes in app 
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;