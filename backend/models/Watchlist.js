const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema(
  {
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    assetType: { 
        type: String, 
        enum: ["Stock", "Crypto", "Forex"], 
        required: true 
    },
    assetName: { 
        type: String, 
        required: true 
    },
  },{ timestamps: true }
);

module.exports = mongoose.model("Watchlist", watchlistSchema);
