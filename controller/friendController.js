const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

const addFriend = asyncHandler(async (req, res) => {
	const { user_id, friendRequest } = req.body;
	console.log({ friendRequest });
	await User.findByIdAndUpdate(friendRequest, {
		$push: { requests: user_id },
	});
	res.send("Request sent Successfully");
});

const acceptRequest = asyncHandler(async (req, res) => {
	const { user_id, friendRequest, users } = req.body;
	// :: add friend in list of friends of the request sender ::
	await User.findByIdAndUpdate(friendRequest, {
		$push: { friends: user_id },
	});
	// :: add friend in list of friends of the request accepter ::
	await User.findByIdAndUpdate(user_id, {
		$push: { friends: friendRequest },
	});
	// :: removing request from list of friends request of user ::
	await User.findByIdAndUpdate(user_id, {
		$pull: { requests: friendRequest },
	});

	console.log({ users }); // :: only log purpose ::
	res.send("Request Accept Successfully");
});

module.exports = { addFriend, acceptRequest };
