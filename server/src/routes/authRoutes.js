import express from "express"
import { signIn,signUp } from "../controller/authController.js"

const authRoutes  = express.Router();

authRoutes .post("/signup", signUp);
authRoutes .post("/signin", signIn);

export default authRoutes ;