require("./config/connection")();
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const accountRoute = require("./routes/accountRoute");
const postRoute = require("./routes/postsRoute");
const jwtRoute = require("./routes/jwtRoute");
const userProfileRoute = require("./routes/profileRoute");
const { getUserDocument } = require("./controller/userController");
const { getSinglePost, getAllPosts } = require("./controller/postController");

const app = express();

// :: middlewares ::
app.use(cors());
app.use(express.json());

// :: routes ::
app.get("/", (req, res) => {
	res.send({ message: "Server is runnig" });
});

app.get("/profile/:id", getUserDocument);
app.get("/posts/single/:id", getSinglePost);
app.get("/posts/all", getAllPosts);

app.use("/account", accountRoute);
app.use("/post", postRoute);
app.use("/jwt", jwtRoute);
app.use("/user", userProfileRoute);

app.listen(process.env.PORT, () => {
	console.log("server is running");
});
