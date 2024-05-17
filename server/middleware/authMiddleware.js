const jwt = require("jsonwebtoken");

const MISSING_AUTH_MSG = "Missing authorization";
const INVALID_FORMAT_MSG = "Invalid authorization token format";
const INVALID_TOKEN_MSG = "Invalid Token";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: MISSING_AUTH_MSG });
  }

  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ message: INVALID_FORMAT_MSG });
  }

  const onlyToken = tokenParts[1];

  jwt.verify(onlyToken, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("Token verification error:", err);
      return res.status(403).json({ message: INVALID_TOKEN_MSG });
    }
    req.user = user;
    next();
  });
};

module.exports = { verifyToken };
