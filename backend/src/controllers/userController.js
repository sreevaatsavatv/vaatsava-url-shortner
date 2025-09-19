import { User } from "../models/user/user.model.js";

export const getUserProfile = async (req, res) => {
  // Dummy user profile data
  try {
    // const userId = req.user.id;
    const userId = req.user.id;
    // Fetch user profile from database using userId
    const data = await User.findById(userId);
    res.status(200).json({ user: data });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
