const { Router } = require("express");
const jwt = require("jsonwebtoken");

const router = Router();

router.post("/verify", async (req, res) => {
	const { token, secret } = req.body;
	try {
		const payload = jwt.verify(token, secret);
		res.send({ payload });
	} catch (error) {
		res.status(400).send("Bad Request");
	}
});
module.exports = router;
