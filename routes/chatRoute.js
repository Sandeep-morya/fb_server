const { Router } = require("express");
const { createChat, getChat } = require("../controller/chatController");
const tokenVerfication = require("../middlewares/tokenVerification");

const router = Router();

router.use(tokenVerfication);

router.post("/create", createChat);

router.get("/:chat_id", getChat);

module.exports = router;
