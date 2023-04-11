require("./config/connection")();
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const accountRoute = require("./routes/accountRoute");
const userRoute = require("./routes/userRoute");
const app = express();

// :: middlewares ::
app.use(cors());
app.use(express.json());

// :: routes ::
app.get("/", (req, res) => {
	res.send({ message: "Server is runnig" });
});

app.use("/account", accountRoute);
app.use("/user", userRoute);

app.listen(process.env.PORT, () => {
	console.log("server is running");
});
