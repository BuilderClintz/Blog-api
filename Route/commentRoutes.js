const express = require('express');
const { allComments, singleComment, updateComment, deleteComment, CreateCommentCtrl, allComent } = require('../Controller/CommentCtrl');
const isLogin = require('../Middlewares/isLogin');

const CommentRouter = express.Router()


//Create comment
CommentRouter.post("/", isLogin, CreateCommentCtrl);

//single comment
CommentRouter.get("/:id", singleComment);

//all comment
CommentRouter.get("/", allComent);

//update comment
CommentRouter.put("/:id",isLogin, updateComment);

//delete comment
CommentRouter.delete("/:id",isLogin, deleteComment);


 module.exports = CommentRouter