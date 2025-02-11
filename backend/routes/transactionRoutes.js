const express = require("express");
const { addTransaction, getTransactions } = require("../controllers/transactionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new transaction (Buy/Sell)
router.post("/add", protect, addTransaction);

// Get all transactions for a user
router.get("/", protect, getTransactions);

module.exports = router;
