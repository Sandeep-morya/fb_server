const { Router } = require("express");
const {
	createNewPost,
	editPost,
	deletePost,
} = require("../controller/postController");
const tokenVerification = require("../middlewares/tokenVerification");

const router = Router();

// :: token verification Middleware :: //
router.use(tokenVerification);

router.post("/create", createNewPost);
router.patch("/update/:id", editPost);
router.delete("/delete/:id", deletePost);

module.exports = router;
