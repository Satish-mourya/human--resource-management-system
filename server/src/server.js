import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import profileRouter from "./routes/profileRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());


// Database connection
connectDB()

// Routes
app.use("/api/auth", authRouter);
app.use("/api/employee",profileRouter);

// intial point
app.get("/", (req, res) => {
  res.send("HRMS Backend Running");
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
