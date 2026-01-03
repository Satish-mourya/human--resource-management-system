import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
 
import { generateToken } from "../utilis/token.js";

// sign up

const signUp = async (req, res) => {
  try {
    const { employeeId, email, password, role } = req.body;

    // Basic validation
    if (!employeeId || !email || !password) {
      return res.status(400).json({
        message: "Employee ID, Email and Password are required",
      });
    }
    // Password rule

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      $or: [{ email }, { employeeId }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await User.create({
      employeeId,
      email,
      password: hashedPassword,
      role,
      isEmailVerified: false, // email verification later
    });

    return res.status(201).json({
      message: "Registration successful. Please verify your email.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

//  sign in

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    // if user not exist
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    // check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

      const token = generateToken({
      userId: user._id,
      role: user.role,
    });

     return res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (error) {
      return res.status(500).json({
      message: "Server error",
    });
  }
};


export {signIn,signUp}