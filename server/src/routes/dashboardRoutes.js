import express from "express";
import { getEmployeeDashboard } from "../controller/dashboardController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const dashboardRouter=express.Router()

dashboardRouter.get("/dashboard", authMiddleware, getEmployeeDashboard);

export default dashboardRouter;