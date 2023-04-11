const { Router } = require("express");
const { createNewPost, updatePost, deletePost } = require("../controller/postController");
const tokenVerification = require("../middlewares/tokenVerification");

const router = Router();

// :: token verification Middleware :: //
router.use(tokenVerification);

router.post("/create", createNewPost);
router.patch("/update/:id", updatePost);
router.delete("/delete/:id", deletePost);

module.exports = router;
