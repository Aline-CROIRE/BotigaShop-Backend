const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to authenticate users via JWT
exports.authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // Extract token
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : authHeader;

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Middleware to authorize admin users only
exports.authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Access denied. Admin role required." });
};
