import User from "../models/userModel.js";
import Attendance from "../models/attendanceModel.js";
import Leave from "../models/leaveModel.js";


const getHRDashboard = async (req, res) => {
    try {
          if (req.user.role !== "HR") {
      return res.status(403).json({ message: "Access denied" });
    }

    const employees = await User.find({ role: "EMPLOYEE" }).select(
      "employeeId email department jobTitle"
    );

    // ATTENDANCE OVERVIEW
       const totalAttendance = await Attendance.countDocuments();

    const today = new Date().toISOString().split("T")[0];

    const todayPresent = await Attendance.countDocuments({
      date: today,
      status: "PRESENT",
    });


     const todayHalfDay = await Attendance.countDocuments({
      date: today,
      status: "HALF_DAY",
    });


    // leave approval
     const pendingLeaves = await Leave.find({ status: "PENDING" })
      .populate("userId", "employeeId email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      employees,
      attendanceSummary: {
        totalRecords: totalAttendance,
        todayPresent,
        todayHalfDay,
      },
      pendingLeaves,
    });

    } catch (error) {
          return res.status(500).json({
      message: "Failed to load HR dashboard",
    });
    }
}

export { getHRDashboard };