const User = require("../model/userModel");
const Post = require("../model/postModel");
const asyncHandler = require("express-async-handler");
require("dotenv").config();
const returnUpdated = { new: true };

const createNewPost = asyncHandler(async (req, res) => {
	const post = new Post({ ...req.body });
	const newPost = await post.save();
	await User.findByIdAndUpdate(
		newPost.user_id,
		{ $push: { posts: newPost._id } },
		returnUpdated,
	);

	res.send({
		message: "Post Created Successfully",
		post_id: newPost._id,
	});
});

const updatePost = asyncHandler(async (req, res) => {
	const post_id = req.params.id;
	const user_id = req.body.user_id;
	const post = await Post.findById(post_id);

	if (post.user_id == user_id) {
		const post = await Post.findByIdAndUpdate(post_id, req.body, returnUpdated);
		res.send(post);
		return;
	} else {
		res.status(405).send({
			error: true,
			message: "it seems you trying to modify someone else post",
		});
		return;
	}
});

const deletePost = asyncHandler(async (req, res) => {
	const post_id = req.params.id;
	const user_id = req.body.user_id;
	const post = await Post.findById(post_id);

	if (post.user_id == user_id) {
		const post = await Post.findByIdAndDelete(post_id);
		res.send(post);
		return;
	} else {
		res.status(405).send({
			error: true,
			message: "it seems you trying to delete someone else post",
		});
		return;
	}
});

const getSinglePost = asyncHandler(async (req, res) => {
	const post = await Post.findById(req.params.id);
	res.send(post);
});

const getAllPosts = asyncHandler(async (req, res) => {
	const secret = req.headers.authorization;
	// console.log(process.env.SECRET == secret, process.env.SECRET, { secret });
	console.log(req.query);

	if (process.env.SECRET == secret) {
		const posts = await Post.find(req.query).sort({ updatedAt: -1 });
		res.send(posts);
	} else {
		res.status(405).send("");
	}
});

module.exports = {
	createNewPost,
	updatePost,
	deletePost,
	getSinglePost,
	getAllPosts,
};
