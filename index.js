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
const chatRoute = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoute");

const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// :: middlewares ::
app.use(cors());
app.use(express.json());

const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

let activeUsers = [];

io.on("connection", (socket) => {
	const { user } = socket.handshake.query;

	if (!activeUsers.includes(user)) {
		activeUsers.push(user);
	}
	io.emit("server:activeUsers", activeUsers);

	socket.on("client:join-room", (room) => {
		socket.join(room);
		// console.log(`${user} joined room ${room}`);
	});

	socket.on("client:send-message", (chat) => {
		socket.to(chat.room).emit("server:send-message", chat);
	});

	socket.on("disconnect", () => {
		activeUsers = activeUsers.filter((e) => e != user);
		io.emit("server:activeUsers", activeUsers);
	});
});

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
app.use("/chat", chatRoute);
app.use("/message", messageRoute);

server.listen(process.env.PORT, () => {
	console.log("server is running");
});
