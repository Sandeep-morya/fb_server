const { Router } = require("express");
const handler = require("express-async-handler");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("../model/user");
const router = Router();

router.get(
	"/",
	handler(async (req, res) => {
		res.send({ message: "user get Route is working" });
	}),
);

router.post(
	"/register",
	handler(async (req, res) => {
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
	}),
);

router.post(
	"/login",
	handler(async (req, res) => {
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
	}),
);

module.exports = router;
