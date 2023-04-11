const mongoose = require('mongoose');

const {String,ObjectId,Number} = mongoose.Schema.Types;

const messageSchema = mongoose.Schema({
	rooms: { type: String, required: true },
	sender: { type: ObjectId, ref: "User", required: true },
	recipient: { type: ObjectId, ref: "User", required: true },
	message: { type: String, required: true },
	time: { type: Number, required: true },
});

module.exports = mongoose.model("Message", messageSchema);