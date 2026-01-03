import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { applyLeave,getAllLeaves,getMyLeaves,updateLeaveStatus } from "../controller/leaveController.js"

const leaveRouter=express.Router();

//emplye access
leaveRouter.post("/apply", authMiddleware, applyLeave);
leaveRouter.get("/me", authMiddleware, getMyLeaves);

// hr acces
leaveRouter.get("/all", authMiddleware, getAllLeaves);
leaveRouter.put("/:id", authMiddleware, updateLeaveStatus);

export default leaveRouter;