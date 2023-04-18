const { Router } = require("express");
const { getMessages, sendMessage } = require("../controller/messageController");
const tokenVerification = require("../middlewares/tokenVerification");

const router = Router();

router.use(tokenVerification);

router.get("/:room", getMessages);
router.post("/", sendMessage);

module.exports = router;
