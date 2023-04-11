const User = require("../model/userModel");
const Post = require("../model/postModel");
const asyncHandler = require('express-async-handler');

const CreateNewPost = asyncHandler(async(req,res)=>{

    const post = new Post({...req.body})

})


