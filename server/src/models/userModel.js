import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // to store in lowercase
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["EMPLOYEE", "HR"],
      default: "EMPLOYEE",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },
    profileImage: {
      type: String,
      default: "",
    },
    jobTitle: {
      type: String,
      default: "",
    },
    department: {
      type: String,
      default: "",
    },
    salary: {
      type: Number,
      default: 0, // read-only for employee
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
