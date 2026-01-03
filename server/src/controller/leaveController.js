import Leave from "../models/leaveModel.js";

// apply leave

const applyLeave = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { type, fromDate, toDate, reason } = req.body;

    if (!type || !fromDate || !toDate) {
      return res.status(400).json({
        message: "Leave type and date range are required",
      });
    }

    const leave = await Leave.create({
      userId,
      type,
      fromDate,
      toDate,
      reason,
    });

    return res.status(201).json({
      message: "Leave request submitted",
      leave,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to apply for leave",
    });
  }
};

//  my leaves employee

const getMyLeaves = async (req, res) => {
  try {
    const userId = req.user.userId;

    const leaves = await Leave.find({ userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json(leaves);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch leave records",
    });
  }
};

// admin view all leaves

const getAllLeaves = async (req, res) => {
  try {
    if (req.user.role !== "HR") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const leaves = await Leave.find()
      .populate("userId", "employeeId email")
      .sort({ createdAt: -1 });

    return res.status(200).json(leaves);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch leave requests",
    });
  }
};

// approve/reject admin view

const updateLeaveStatus = async (req, res) => {
  try {
    if (req.user.role !== "HR") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const { status, adminComment } = req.body;
    const leaveId = req.params.id;

    if (!["APPROVED", "REJECTED"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const leave = await Leave.findByIdAndUpdate(
      leaveId,
      { status, adminComment },
      { new: true }
    );

    return res.status(200).json({
      message: "Leave status updated",
      leave,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update leave status",
    });
  }
};

export {applyLeave,getAllLeaves,getMyLeaves,updateLeaveStatus}
