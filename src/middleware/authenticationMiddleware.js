const jwt = require("jsonwebtoken");

const secretKey = "your_secret_key"; // Replace with a secure secret key

const authenticationMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).send({ error: "Unauthorized - Missing token" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: "Unauthorized - Invalid token" });
    }
    req.userId = decoded.userId;
    req.userRole = decoded.role; // Add user role to the request object
    next();
  });
};

module.exports = authenticationMiddleware;
