
const express = require('express');
const { allpost, AllPost, Singlepost, Allpost, Updatepost, Deletepost, createPostCtrl, SinglePost, toggleLikesPostCtrl, toggleDislikesPostCtrl, postDetailsCtrl } = require('../Controller/PostCtrl');
const postRouter = express.Router();
const isLogin = require("../Middlewares/isLogin");

//CREATE POST
postRouter.post("/", isLogin, createPostCtrl)

//All Post
postRouter.get("/",isLogin, Allpost);

//single Post
postRouter.get("/profile/:id", SinglePost);

//Like Post 
postRouter.get("/likes/:id",isLogin,toggleLikesPostCtrl)

//Dislike Post 
postRouter.get("/dislikes/:id",isLogin,toggleDislikesPostCtrl)

//Post details Post 
postRouter.get("/:id",isLogin, postDetailsCtrl)

//update Post
postRouter.put("/profile/:id", Updatepost);

//delete Post
postRouter.delete("/profile/:id", Deletepost);


module.exports = postRouter