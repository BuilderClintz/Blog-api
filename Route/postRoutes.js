
const express = require('express');
const { allpost, AllPost, Singlepost, Allpost, Updatepost, Deletepost, createPostCtrl, SinglePost } = require('../Controller/PostCtrl');
const postRouter = express.Router();
const isLogin = require("../Middlewares/isLogin");

//CREATE POST
postRouter.post("/", isLogin, createPostCtrl)

//All Post
postRouter.get("/", Allpost);


//single Post
postRouter.get("/profile/:id", SinglePost);


//update Post
postRouter.put("/profile/:id", Updatepost);

//delete Post
postRouter.delete("/profile/:id", Deletepost);


module.exports = postRouter