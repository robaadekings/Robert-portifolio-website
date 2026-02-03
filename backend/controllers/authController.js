const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const path = require("path");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  res.json({
    token: generateToken(user),
    user: { id: user._id, name: user.name, role: user.role, profileImage: user.profileImage },
  });
};

exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    // Ensure only one admin exists
    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      return res.status(400).json({ message: "Admin account already exists" });
    }

    // Prevent registering with an email that's already used
    const emailTaken = await User.findOne({ email });
    if (emailTaken) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const newAdmin = await User.create({ name, email, password, role: "admin" });

    res.status(201).json({
      token: generateToken(newAdmin),
      user: { id: newAdmin._id, name: newAdmin.name, role: newAdmin.role, profileImage: newAdmin.profileImage },
    });
  } catch (error) {
    console.error("Register admin error:", error);
    res.status(500).json({ message: "Error creating admin", error: error.message });
  }
};
exports.uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "portfolio/profile-images",
      public_id: `profile-${user._id}`,
      overwrite: true,
      resource_type: "auto",
    });

    // Update user with profile image URL
    user.profileImage = result.secure_url;
    await user.save();

    // Delete local file
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.json({
      message: "Profile image uploaded successfully",
      profileImage: user.profileImage,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Error uploading image", error: error.message });
  }
};
