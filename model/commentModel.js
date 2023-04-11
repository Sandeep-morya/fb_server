const mongoose = require("mongoose");

const { ObjectId, String } = mongoose.Schema.Types;

const commentSchema = mongoose.Schema(
	{
		commentator: { type: ObjectId, required: true },
		content: { type: String, required: true },
	},
	{ timestamps: true },
);


module.exports = mongoose.model("Comment", commentSchema)
