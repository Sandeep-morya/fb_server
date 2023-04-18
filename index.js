require("./config/connection")();
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { getUserDocument, getAllUsers } = require("./controller/userController");
const { getSinglePost, getAllPosts } = require("./controller/postController");

const accountRoute = require("./routes/accountRoute");
const postRoute = require("./routes/postsRoute");
const jwtRoute = require("./routes/jwtRoute");
const userProfileRoute = require("./routes/profileRoute");
const friendRoute = require("./routes/friendRoute");

const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
	cors: {},
});

io.on("connection", (socket) => {
	const { user } = socket.handshake.query;
	console.log({ user });
});

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
app.get("/users/all", getAllUsers);

app.use("/account", accountRoute);
app.use("/post", postRoute);
app.use("/jwt", jwtRoute);
app.use("/user", userProfileRoute);
app.use("/friend", friendRoute);

server.listen(process.env.PORT, () => {
	console.log("server is running");
});
