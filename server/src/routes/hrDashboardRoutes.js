import express, { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getHRDashboard } from "../controller/hrDashboardController.js";

const hrDashboardRouter=express.Router();
hrDashboardRouter.get("/dashboard",authMiddleware,getHRDashboard)


export default hrDashboardRouter