import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { checkIn,checkOut,getAllAttendance,getMyAttendance } from "../controller/attendanceController.js"


const attendanceRouter=express.Router();

attendanceRouter.post("/check-in", authMiddleware, checkIn);
attendanceRouter.post("/check-out", authMiddleware, checkOut);
attendanceRouter.get("/me", authMiddleware, getMyAttendance);
attendanceRouter.get("/all", authMiddleware, getAllAttendance);

export default attendanceRouter
