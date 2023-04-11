require("./config/connection")();
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const userRoute = require("./routes/usersRoute");
const app = express();

// :: middlewares ::
app.use(cors());
app.use(express.json());

// :: routes ::
app.get("/", (req, res) => {
	res.send({ message: "Server is runnig" });
});

app.use("/users", userRoute);

app.listen(process.env.PORT, () => {
	console.log("server is running");
});
