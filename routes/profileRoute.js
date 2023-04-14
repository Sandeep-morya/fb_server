const { Router } = require("express");
const {
	UpdateInUserProfile,
	lowlevelProfileUpdate,
} = require("../controller/profileController");
const tokenVerification = require("../middlewares/tokenVerification");

const router = Router();

router.use(tokenVerification);

// :: This in use can change --> dp,cover,email,gender,dob ::
router.patch("/update/low", lowlevelProfileUpdate); //

module.exports = router;
