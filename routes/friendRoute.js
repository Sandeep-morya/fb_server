const { Router } = require("express");
const { addFriend, acceptRequest } = require("../controller/friendController");
const tokenVerification = require("../middlewares/tokenVerification");

const router = Router();

router.use(tokenVerification);

router.post("/add", addFriend);

router.post("/accept", acceptRequest);

module.exports = router;
