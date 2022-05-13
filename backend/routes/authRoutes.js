// const express = require("express");
const {
  register,
  login,
  getAllUsers,
} = require("../controllers/authControllers");
const { authorizeUser } = require("../middleware/authMiddleware");

const router = require("express").Router();
router.route("/").get(authorizeUser, getAllUsers);
router.route("/register").post(register);
router.post("/login", login);

module.exports = router;
