const { Router } = require("express");
const { getUserDocument } = require("../controller/userController");
const tokenVerification = require("../middlewares/tokenVerification");

const router = Router();

// :: token verification Middleware :: //
router.use(tokenVerification);

// :: returns the user Object of the id sent by tokenVerification Middleware ::
router.get("/profile", getUserDocument);

module.exports = router;
