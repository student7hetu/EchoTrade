const Watchlist = require("../models/Watchlist");

// Add an asset to watchlist
const addToWatchlist = async (req, res) => {
  try {
    const { assetType, assetName } = req.body;
    const userId = req.user.id;

    if (!assetType || !assetName) {
      return res.status(400).json({ message: "Asset type and name are required" });
    }

    const watchlistItem = new Watchlist({ user: userId, assetType, assetName });
    await watchlistItem.save();

    res.status(201).json(watchlistItem);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all watchlist items
const getWatchlist = async (req, res) => {
  try {
    const watchlist = await Watchlist.find({ user: req.user.id });
    res.status(200).json(watchlist);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Remove an asset from watchlist
const removeFromWatchlist = async (req, res) => {
  try {
    const { id } = req.params;
    await Watchlist.findByIdAndDelete(id);
    res.status(200).json({ message: "Removed from watchlist" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { addToWatchlist, getWatchlist, removeFromWatchlist };
