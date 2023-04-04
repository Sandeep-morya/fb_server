const { Router } = require("express");
const handler = require("express-async-handler");

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
		res.send({ message: "user register Route is working" });
	}),
);

router.post(
	"/login",
	handler(async (req, res) => {
		res.send({ message: "user login Route is working" });
	}),
);

module.exports = router;
