const express = require("express");
const { addToWatchlist, getWatchlist, removeFromWatchlist } = require("../controllers/watchlistController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Add asset to watchlist
router.post("/add", protect, addToWatchlist);

// Get watchlist items
router.get("/", protect, getWatchlist);

// Remove asset from watchlist
router.delete("/remove/:id", protect, removeFromWatchlist);

module.exports = router;