const jwt = require("jsonwebtoken");
require("dotenv").config();
const asyncHandler = require("express-async-handler");

/**
 *This middleware verifies the authenticity of a JSON Web Token (JWT) and returns the decoded payload if the token is valid
 *
 */
const tokenVerification = asyncHandler(async (req, res, next) => {
		const token = req.headers.authorization;
		req.body.user_id = jwt.verify(token, process.env.SECERT);
		next();
});

module.exports = tokenVerification;
