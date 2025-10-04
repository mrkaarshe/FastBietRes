import userModel from "../models/userModel.js";


export const getUserDetails = async (req, res) => {
    const userId = req.body.userId;
  try {
    const user = await userModel.findById(userId)
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      name: user.name,
      email: user.email,
      isAccountVerified: user.isAccountVerified
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
