const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
require("dotenv").config();

// :: get User Document Controller ::

const getUserDocument = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select("-password");
	res.send(user);
});

const getAllUsers = asyncHandler(async (req, res) => {
	const secret = req.headers.authorization;
	const name = { $regex: req.query.q, $options: "i" };

	if (process.env.SECRET == secret) {
		const users = await User.find(name ? { name } : req.query)
			.sort({ updatedAt: -1 })
			.limit(30)
			.select("_id image name");
		res.send(users);
	} else {
		res.status(405).send("");
	}
});

module.exports = { getUserDocument, getAllUsers };
