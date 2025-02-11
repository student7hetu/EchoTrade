const express = require("express");
const { getUserProfile, updateUserProfile } = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", authMiddleware, getUserProfile);
router.put("/me", authMiddleware, updateUserProfile);

module.exports = router;
