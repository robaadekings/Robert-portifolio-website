const express = require("express");
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/", auth, admin, upload.array("images", 5), createProject);
router.put("/:id", auth, admin, upload.array("images", 5), updateProject);
router.delete("/:id", auth, admin, deleteProject);

module.exports = router;
