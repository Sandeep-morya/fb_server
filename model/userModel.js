const mongoose = require("mongoose");

/* here i am using types provided by Mongoose */
const { String, Boolean, ObjectId } = mongoose.Schema.Types;

/*  User Model Fields
	- name
	- email
	- password
    - dob

 */

const userSchema = mongoose.Schema(
	{
		name: { type: String },
		image: {
			type: String,
			required: true,
		},
		cover: {
			type: String,
			default: "",
		},
		email: { type: String, default: "" },
		mobile: { type: String, required: true, unique: true },
		password: { type: String, requied: true },
		dob: { type: String, requied: true },
		gender: { type: String, requied: true },
		friends: {
			type: [
				{
					type: ObjectId,
					ref: "User",
				},
			],
			default: [],
		},
		followers: {
			type: [
				{
					type: ObjectId,
					ref: "User",
				},
			],
			default: [],
		},
		followings: {
			type: [
				{
					type: ObjectId,
					ref: "User",
				},
			],
			default: [],
		},
		chats: {
			type: [
				{
					type: ObjectId,
					ref: "Chat",
				},
			],
			default: [],
		},
		posts: {
			type: [
				{
					type: ObjectId,
					ref: "Post",
				},
			],
			default: [],
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
