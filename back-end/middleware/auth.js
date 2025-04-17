const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Extract token from the Authorization header
  const token = req.header("Authorization");

  // Check if the token is provided
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Check if the token is prefixed with "Bearer "
  if (!token.startsWith("Bearer ")) {
    return res.status(400).json({ msg: "Invalid token format" });
  }

  try {
    // Remove "Bearer " prefix and verify the token
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Move to the next middleware or route handler
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
