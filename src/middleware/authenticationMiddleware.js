const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.SECRETKEY; // Replace with a secure secret key

const authenticationMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .send({ error: "Unauthorized Middleware - Missing token" });
  }
  const jwtToken = token.split(" ");
  jwt.verify(jwtToken[1], secretKey, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ error: "Unauthorized Middleware - Invalid token" });
    }
    req.userId = decoded.userId;
    req.userRole = decoded.role; // Add user role to the request object
    next();
  });
};

module.exports = authenticationMiddleware;
