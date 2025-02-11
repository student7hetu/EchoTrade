const Transaction = require("../models/Transaction");
const Portfolio = require("../models/Portfolio");
const User = require("../models/User");

// Add a new transaction
const addTransaction = async (req, res) => {
  try {
    const { assetType, assetName, quantity, price, transactionType } = req.body;
    const userId = req.user.id;

    if (!assetType || !assetName || !quantity || !price || !transactionType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const totalCost = quantity * price;
    const user = await User.findById(userId);

    if (transactionType === "Buy" && user.balance < totalCost) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Create the transaction
    const transaction = new Transaction({
      user: userId,
      assetType,
      assetName,
      quantity,
      price,
      total: totalCost,
      transactionType,
    });

    await transaction.save();

    // Update user's balance
    if (transactionType === "Buy") {
      user.balance -= totalCost;
    } else {
      user.balance += totalCost;
    }
    await user.save();

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all transactions for a user
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { addTransaction, getTransactions };
