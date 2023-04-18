const asyncHandler = require("express-async-handler");
const Chat = require("../model/chatModel");
const User = require("../model/userModel");

const createChat = asyncHandler(async (req, res) => {
	const { members } = req.body;
	const chats = await Chat.find({ members: { $all: members } });
	if (chats.length) {
		return res.send(chats[0]);
	}
	const chat = new Chat({
		members,
	});
	const data = await chat.save();

	for (let user of data.members) {
		await User.findByIdAndUpdate(user, { $push: { chats: data._id } });
	}
	return res.send(data);
});

const getChat = asyncHandler(async (req, res) => {
	const { chat_id } = req.params;

	const chat = await Chat.findById(chat_id);
	res.send(chat);
});

module.exports = { createChat, getChat };
