const { Router } = require("express");
const handler = require("express-async-handler");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const User = require("../model/userModel");
const {
	loginController,
	registerController,
} = require("../controller/userController");
const router = Router();

router.get(
	"/",
	handler(async (req, res) => {
		res.send({ message: "user get Route is working" });
	}),
);

router.post("/register", registerController);

router.post("/login", loginController);

module.exports = router;
