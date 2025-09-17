export const isLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      console.log("No token found");
      return res.status(401).json({ message: "No Token Found" });
    }
    // Verify token
    const decrypted = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decrypted; // Attach user info to request object
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
