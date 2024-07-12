
const express = require('express');
const { allpost, AllPost, Singlepost, Allpost, Updatepost, Deletepost } = require('../Controller/PostCtrl');
const postRouter = express.Router()


//All Post
postRouter.get("/", Allpost);


//single Post
postRouter.get("/profile/:id", Singlepost);


//update Post
postRouter.put("/profile/:id", Updatepost);

//delete Post
postRouter.delete("/profile/:id", Deletepost);


    module.exports = postRouter