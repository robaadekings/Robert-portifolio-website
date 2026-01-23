const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const seedAdmin = async () => {
  const adminExists = await User.findOne({ role: "admin" });

  if (adminExists) {
    console.log("Admin already exists");
    process.exit();
  }

  await User.create({
    name: "Admin",
    email: "admin@portfolio.com",
    password: "admin123",
    role: "admin",
  });

  console.log("Admin created");
  process.exit();
};

seedAdmin();
