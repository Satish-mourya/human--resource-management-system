import { truncates } from "bcryptjs";
import mongoose from "mongoose";
const attendanceSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    },
     date: {
      type: String, 
      required: true,
    },
    checkIn: {
      type: Date,
      default: null,
    },
    checkOut: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["PRESENT", "HALF_DAY", "LEAVE"],
      default: "PRESENT",
    },
},{timestamps:true});

const Attendance =
  mongoose.models.Attendance ||
  mongoose.model("Attendance", attendanceSchema);


  export default Attendance;

