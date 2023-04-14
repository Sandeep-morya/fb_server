const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

// :: This in use can change --> dp,cover,email,gender,dob ::
const lowlevelProfileUpdate = asyncHandler(async (req, res, next) => {
	const id = req.body.user_id;
	const updates = {};
	for (let key in req.body) {
		if (
			key == "image" ||
			key == "cover" ||
			key == "email" ||
			key == "gender" ||
			key == "dob"
		) {
			updates[key] = req.body[key];
		}
	}

	const updatedRes = await User.findByIdAndUpdate(id, updates, {
		new: true,
	}).select("-password");
	if (!updatedRes) {
		throw new Error("Someting went wrong");
	}
	res.send(updatedRes);
});
module.exports = { lowlevelProfileUpdate };
