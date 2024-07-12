const express = require('express');
const { allComments, singleComment, updateComment, deleteComment } = require('../Controller/CommentCtrl');

const CommentRouter = express.Router()


//All comment
CommentRouter.get("/", allComments );

//single comment
CommentRouter.get("/profile/:id", singleComment);

//update comment
CommentRouter.put("/profile/:id", updateComment);

//delete comment
CommentRouter.delete("/profile/:id", deleteComment);


 module.exports = CommentRouter