const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
require("dotenv").config();

// :: get User Document Controller ::

const getUserDocument = asyncHandler(async (req, res) => {
	const user = await User.findOne({ _id: req.body.user_id }).select(
		"-password",
	);
	res.send(user);
});

module.exports = { getUserDocument };
