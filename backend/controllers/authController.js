const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Register Controller
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      console.log("🔍 Registering User:", { name, email });
  
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("🔑 Hashed Password:", hashedPassword);
  
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
      
      console.log("✅ User Registered Successfully");
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      console.error("❌ Registration Error:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };  

//Login Controller
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "User not found" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
      res.json({ token, userId: user._id });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  };