const Message = require("../models/Message");

exports.sendMessage = async (req, res) => {
  await Message.create(req.body);
  res.status(201).json({ message: "Message sent" });
};

exports.getMessages = async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
};
