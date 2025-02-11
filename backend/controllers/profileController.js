const User = require("../models/User");

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { name, skills, learningGoals } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.skills = skills || user.skills;
    user.learningGoals = learningGoals || user.learningGoals;

    await user.save();
    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUserProfile, updateUserProfile };
