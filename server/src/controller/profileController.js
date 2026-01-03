import User from "../models/userModel.js";

// view my profile

const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const profile = await User.findById(userId).select("-password");

    if (!profile) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(profile);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch profile",
    });
  }
};

// UPDATE MY PROFILE

const updateMyProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { address, phone, profileImage } = req.body;

    const updatedProfile = await User.findByIdAndUpdate(
      userId,
      { address, phone, profileImage },
      { new: true }
    ).select("-password");

    return res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {

     return res.status(500).json({
      message: "Failed to update profile",
    });
  }
};

export {getMyProfile,updateMyProfile}
