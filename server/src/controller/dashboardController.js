import User from "../models/userModel.js";
import Attendance from "../models/attendanceModel.js";
import Leave from "../models/leaveModel.js";

const getEmployeeDashboard = async (req, res) => {
  try {

    // profile summary
    const userId = req.user.userId;
    const profile = await User.findById(userId).select(
      "employeeId email role department jobTitle"
    );

    // attendance summary
     const presentDays = await Attendance.countDocuments({
      userId,
      status: "PRESENT",
    });

    const halfDays = await Attendance.countDocuments({
      userId,
      status: "HALF_DAY",
    });

    // leave summary

        const pendingLeaves = await Leave.countDocuments({
      userId,
      status: "PENDING",
    });

    const approvedLeaves = await Leave.countDocuments({
      userId,
      status: "APPROVED",
    });
    // recent activity

     const recentAttendance = await Attendance.find({ userId })
      .sort({ createdAt: -1 })
      .limit(30)
      .select("date status");

        const recentLeaves = await Leave.find({ userId })
      .sort({ createdAt: -1 })
      .limit(20)
      .select("type status");

      return res.status(200).json({
      profile,
      attendance: {
        presentDays,
        halfDays,
      },
      leaves: {
        pending: pendingLeaves,
        approved: approvedLeaves,
      },
      recentActivity: {
        attendance: recentAttendance,
        leaves: recentLeaves,
      },
    });


  } catch (error) {
     return res.status(500).json({
      message: "Failed to load employee dashboard",
    });
  }
};

export {getEmployeeDashboard}