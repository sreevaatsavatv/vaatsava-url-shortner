import { ShortURL } from "../models/shorturl.model.js";
import { User } from "../models/user/user.model.js";

export const getUserProfile = async (req, res) => {
  // Dummy user profile data
  try {
    // const userId = req.user.id;
    const userId = req.user.id;
    // Fetch user profile from database using userId
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
export const getMyUrls = async (req, res) => {
  try {
    const userId = req.user.id; // 👈 comes from auth middleware
    console.log("UserID from token:", userId);

    // pagination support
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [urls, total] = await Promise.all([
      ShortURL.find({ userId }) // fetch only this user's urls
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      ShortURL.countDocuments({ userId }),
    ]);

    console.log("URLs fetched:", urls);

    return res.status(200).json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      urls,
    });
  } catch (error) {
    console.error("Error in getMyUrls:", error);
    return res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};
