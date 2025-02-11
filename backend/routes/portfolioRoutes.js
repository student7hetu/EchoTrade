const express = require("express");
const { getPortfolio } = require("../controllers/portfolioController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get user portfolio
router.get("/", protect, getPortfolio);

module.exports = router;
