const express = require("express");
const {
  sendMessage,
  getMessages,
} = require("../controllers/messageController");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/", sendMessage);
router.get("/", auth, admin, getMessages);

module.exports = router;
