const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true 
    },
    assetType: { type: String, 
        enum: ["Stock", "Crypto", "Forex"], 
        required: true 
    },
    assetName: { 
        type: String, 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true 
    },
    averagePrice: { 
        type: Number, 
        required: true 
    },
  },{ timestamps: true }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);
