﻿const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
require("dotenv").config();

// :: get User Document Controller ::

const getUserDocument = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select("-password");
	res.send(user);
});

const getAllUsers = asyncHandler(async (req, res) => {
	const secret = req.headers.authorization;
	const nameQuery = req.query.q || ""; // Set an empty string as the default value for name query

	if (process.env.SECRET == secret) {
		const users = await User.find(
			nameQuery ? { name: { $regex: nameQuery, $options: "i" } } : {},
		)
			.sort({ updatedAt: -1 })
			.limit(30)
			.select("_id image name");
		res.send(users);
	} else {
		res.status(405).send("");
	}
});

module.exports = { getUserDocument, getAllUsers };
