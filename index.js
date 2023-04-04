const express = require("express");
const cors = require("cors");
const app = express();
// :: middlewares ::
app.use(cors());
app.use(express.json());
// :: routes ::
app.get("/", (req, res) => {
	res.send({ message: "Server is runnig" });
});

app.listen(8080, () => {
	console.log("server is running");
});
