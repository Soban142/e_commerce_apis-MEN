const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const authHeaders = req.headers.token;
  if (!authHeaders) return res.status(401).json("You are not authenticated!");

  const token = authHeaders.split(" ")[1];
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(400).json("Token is not valid");
    req.user = user;
    next();
  });
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(401).json("You are unauthorized to do this specific task.");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user);
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(401).json("You are unauthorized to do this specific task.");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
