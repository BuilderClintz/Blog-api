const express = require('express');
const { allComments, singleComment, updateComment, deleteComment, CreateCommentCtrl } = require('../Controller/CommentCtrl');
const isLogin = require('../Middlewares/isLogin');

const CommentRouter = express.Router()


//Create comment
CommentRouter.post("/", isLogin, CreateCommentCtrl);

//single comment
CommentRouter.get("/:id", singleComment);

//update comment
CommentRouter.put("/:id", updateComment);

//delete comment
CommentRouter.delete("/:id", deleteComment);


 module.exports = CommentRouter