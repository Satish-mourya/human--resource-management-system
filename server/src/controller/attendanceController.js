import Attendance from "../models/attendanceModel.js";

// check in

const checkIn = async (req, res) => {
  try {
    const userId = req.user.userId;
    const today = new Date().toISOString().split("T")[0];

    const existing = await Attendance.findOne({ userId, date: today });

    if (existing && existing.checkIn) {
      return res.status(400).json({
        message: "Already checked in today",
      });
    }

    const attendance =
      existing ||
      new Attendance({
        userId,
        date: today,
      });

    attendance.checkIn = new Date();
    await attendance.save();

    return res.status(200).json({
      message: "Check-in successful",
      attendance,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Check-in failed",
    });
  }
};

//  checkout

const checkOut = async (req, res) => {
  try {
    const userId = req.user.userId;
    const today = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.findOne({ userId, date: today });

    if (!attendance || !attendance.checkIn) {
      return res.status(400).json({
        message: "Check-in required before check-out",
      });
    }

    if (attendance.checkOut) {
      return res.status(400).json({
        message: "Already checked out today",
      });
    }

    attendance.checkOut = new Date();

    // Calculate working hours
    const hoursWorked =
      (attendance.checkOut - attendance.checkIn) / (1000 * 60 * 60);

    attendance.status = hoursWorked < 4 ? "HALF_DAY" : "PRESENT";

    await attendance.save();

    return res.status(200).json({
      message: "Check-out successful",
      attendance,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Check-out failed",
    });
  }
};


// getemployee attendance
// employee view

const getMyAttendance = async (req, res) => {
  try {
    const userId = req.user.userId;

    const records = await Attendance.find({ userId }).sort({ date: -1 });

    return res.status(200).json(records);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch attendance",
    });
  }
};


// admin view

const getAllAttendance = async (req, res) => {
  try {
    if (req.user.role !== "HR") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const records = await Attendance.find()
      .populate("userId", "employeeId email")
      .sort({ date: -1 });

    return res.status(200).json(records);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch attendance records",
    });
  }
};



export {checkIn,checkOut,getAllAttendance,getMyAttendance}




