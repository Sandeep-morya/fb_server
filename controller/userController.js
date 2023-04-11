const User = require("../model/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require("express-async-handler");
require("dotenv").config();
// :: Registration Controller ::

const registerController = asyncHandler(async (req, res) => {
	const mobile = req.body.mobile;
	const mobileExists = await User.findOne({ mobile });
	if (mobileExists) {
		res.json({ message: "Mobile Numeber already Registered" });
		return;
	}

	const password = await bcrypt.hash(String(req.body?.password), 5);
	const user = new User({ ...req.body, password });

	const { _id } = await user.save();
	const token = jwt.sign(JSON.stringify(_id), process.env.SECERT);

	res.send({ message: "Registration Successful", token });
});

// :: Login Controller ::

 const loginController = asyncHandler(async (req, res) => {
	const { mobile, password } = req.body;
	const user = await User.findOne({ mobile });
	if (!user) {
		res.json({ message: "Above mobile number is not registered with us" });
		return;
	}

	const auth = await bcrypt.compare(String(password), user.password);
	if (!auth) {
		res.json({ message: "Oopss.. you have enterd a wrong password" });
		return;
	}

	const token = jwt.sign(String(user._id), process.env.SECERT);
	res.send({ message: "Login Successful", token });
});


module.exports = { loginController, registerController };