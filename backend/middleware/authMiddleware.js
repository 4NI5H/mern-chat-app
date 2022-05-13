const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const authorizeUser = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("token", token);

      // verifies and decodes and give id
      const decodeId = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decodeId", decodeId);
      req.user = await User.findById(decodeId.id).select("-password");
      console.log("user in req", req.user);
      next();
    } catch (error) {
      console.log("error middleware");
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { authorizeUser };
