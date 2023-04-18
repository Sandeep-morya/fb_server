const asyncHandler = require("express-async-handler");
const Message = require("../model/MessageModel");

const sendMessage = asyncHandler(async (req, res) => {
	const message = new Message(req.body.message);
	const output = await message.save();
	res.send({ output });
});

const getMessages = asyncHandler(async (req, res) => {
	const messages = await Message.find({ room: req.params.room });
	res.send(messages);
});

module.exports = { sendMessage, getMessages };
