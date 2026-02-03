const express = require("express");
const { login, uploadProfileImage, registerAdmin } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const uploadMiddleware = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/login", login);
router.post("/upload-profile", authMiddleware, uploadMiddleware.single("profileImage"), uploadProfileImage);
router.post("/register-admin", registerAdmin);

module.exports = router;
