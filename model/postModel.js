const mongoose = require("mongoose");

const { String, Boolean, ObjectId, Number } = mongoose.Schema.Types;
const postSchema = mongoose.Schema(
	{
		type: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			default: "",
		},
		user_id: {
			type: ObjectId,
			required: true,
		},
		likes: {
			type: Number,
			default: 0,
		},
		hearts: {
			type: Number,
			default: 0,
		},
		wows: {
			type: Number,
			default: 0,
		},
		sads: {
			type: Number,
			default: 0,
		},
		cares: {
			type: Number,
			default: 0,
		},
		hahas: {
			type: Number,
			default: 0,
		},
		angries: {
			type: Number,
			default: 0,
		},
		comments: {
			type: [
				{
					type: ObjectId,
					ref: "Comment",
				},
			],
			default: [],
		},
		shares: {
			type: Number,
			default: 0,
		},
		tags: {
			type: [String],
			default: [],
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("Post", postSchema);
