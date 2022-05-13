const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../util/generateToken");
const bcrypt = require("bcrypt");

const register = asyncHandler(async (req, res) => {
  console.log("register");
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error(`Please enter all fields`);
  }

  if (await User.findOne({ email })) {
    res.status(400);
    throw new Error("User already exists");
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: encryptedPassword,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create user");
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("req body---", email, password);
  const user = await User.findOne({ email });
  console.log("user---", user);
  console.log("password", await bcrypt.compare(password, user.password));
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const searchQuery = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  console.log("search query", searchQuery);
  const users = await User.find(searchQuery).find({
    _id: { $ne: req.user._id },
  });
  console.log("user searched", users);
  res.send(users);
});

module.exports = { register, login, getAllUsers };
