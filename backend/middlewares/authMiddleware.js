const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({ message: "No token" });
    }
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    req.userId = decoded.userId; // attach userId
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;