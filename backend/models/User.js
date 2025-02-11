const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    balance: { 
      type: Number, 
      default: 0 
    }, // User's available balance
    transactions: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Transaction" 
    }],
  },{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
