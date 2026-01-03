import express from "express";
import { getMyProfile,updateMyProfile } from "../controller/profileController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const profileRouter=express.Router();

profileRouter.get("/profile", authMiddleware, getMyProfile);
profileRouter.put("/profile", authMiddleware, updateMyProfile);

export default profileRouter;