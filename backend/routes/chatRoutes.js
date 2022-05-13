const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatController");
const { authorizeUser } = require("../middleware/authMiddleware");

const router = require("express").Router();
router.route("/").post(authorizeUser, accessChat);
router.route("/").get(authorizeUser, fetchChats);
router.route("/group").post(authorizeUser, createGroupChat);
router.route("/rename").put(authorizeUser, renameGroup);
router.route("/groupremove").put(authorizeUser, removeFromGroup);
router.route("/groupadd").put(authorizeUser, addToGroup);

module.exports = router;
