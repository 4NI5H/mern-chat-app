const {
  sendMessage,
  allMessages,
} = require("../controllers/messageController");
const { authorizeUser } = require("../middleware/authMiddleware");
const router = require("express").Router();

router.route("/").post(authorizeUser, sendMessage);
router.route("/:chatId").get(authorizeUser, allMessages);

module.exports = router;
