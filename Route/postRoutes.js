
const express = require('express');
const {  Allpost, Updatepost, createPostCtrl, SinglePost, toggleLikesPostCtrl, toggleDislikesPostCtrl, postDetailsCtrl, DeletepostCtrl } = require('../Controller/PostCtrl');
const postRouter = express.Router();
const isLogin = require("../Middlewares/isLogin");
const storage = require('../Config/cloudinary');
const multer = require('multer');

//instance of multer 
const upload = multer ({storage})

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
postRouter.put("/profile/:id",upload.single("photo"), Updatepost);

//delete Post
postRouter.delete("/:id", DeletepostCtrl);


module.exports = postRouter