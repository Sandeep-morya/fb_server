const { Router } = require("express");
const tokenVerification = require("../middlewares/tokenVerification");


const router = Router();

// :: token verification Middleware :: //
router.use(tokenVerification);


router.post("/",)


