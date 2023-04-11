const { Router } = require("express");
const {
	loginController,
	registerController,
} = require("../controller/accountController");

const router = Router();

// :: route for new user registration ::
router.post("/register", registerController);
// :: return  registrastion message & jwt token ::

// :: route for new user login ::
router.post("/login", loginController);
// :: return  login message & jwt token ::

module.exports = router;
