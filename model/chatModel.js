const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;


const chatSchema = mongoose.Schema(
	{
		participants: [
			{
				type:ObjectId,
				ref: "User",
				required: true,
			},
		],
		messages: [
			{
				type:ObjectId,
				ref: "Message",
			},
		],
	},
	{ timestamps: true },
);

module.exports = mongoose.model("Chat", chatSchema);