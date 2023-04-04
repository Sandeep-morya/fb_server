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
		email: { type: String },
		mobile: { type: String, required: true, unique: true },
		password: { type: String, requied: true },
		dob: { type: String, requied: true },
		gender: { type: String, requied: true },
	},
	{ timestamps: true },
);

const User = mongoose.model("user", userSchema);

module.exports = User;
