const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
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
    quantity: { 
        type: Number, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    }, // Price at the time of transaction
    total: { 
        type: Number, 
        required: true 
    }, // quantity * price
    transactionType: { 
        type: String, enum: ["Buy", "Sell"], 
        required: true 
    },
  },{ timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
