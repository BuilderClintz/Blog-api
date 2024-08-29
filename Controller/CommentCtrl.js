const Comment = require("../Model/Comment/Comment");
const Post = require("../Model/Post/Post");
const User = require("../Model/User/User");
const appErr = require("../Utils/appErr");


//Create Comment 
const CreateCommentCtrl = async (req,res,next) =>{
    const {description} = req.body;
    try{
        // find the post 
        const post = await Post.findById(req.params.id) 
        //create comment
        const comment = await Comment.create({
            post:post._id,
            description,
            user: req.userAuth
        });
        // push  the comment to the post 
        post.comments.push(comment._id)
        //find the user 
        const user = await User.findById(req.userAuth)
        //push to user list 
        user.comments.push(comment._id)
        //save the comment 
        await post.save()
        await user.save()

        res.json({
            status: "success",
            data: comment,
        })
    } catch (error) {
        next(appErr(error.message))
    }
}
//all comment 
const allComent = async (req, res, next)=>{
    const comments = await Comment.find();
    try {
        res.json({
            status: "success",
            data: comments,       
         })
    } catch (error) {
        next(appErr(error.message))
    }
}

//single Comment 
const singleComment =  async (req,res,next)=>{
    try {
        const comment = await Comment.findById(req.params.id)
        res.json({
            status: "success",
            data: comment,
        })
    } catch (error) {
        next(appErr(error.message))
    }
}

//update Comment 
const updateComment = async (req,res,next)=>{
    const { post , description } = req.body; 
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id,
            { post, description },
            {new: true, runValidators: true}
        )
        res.json({
            status: "success",
            data: comment
        })
    } catch (error) {
        next(appErr(error.message))
    }
}

//Delete Comment 
const deleteComment =  async (req,res,next)=>{
    try {
       const comments = await Comment.findById(req.params.id);
       if(!comments){
        return next (appErr("Post does not exist or it has been deleted"),403)
       }
       if (comments.user.toString() != req.userAuth.toString()){
        return next(appErr("You are not allowed to delete this comment"),403)
       }
        await Comment.findByIdAndDelete(req.params.id)
        res.json({
            status: "success",
            data: "Comment deleted successfully",
        })
    } catch (error) {
         next(appErr(error.message))
    }
}

module.exports = {
    allComent,
    CreateCommentCtrl,
    singleComment,
    updateComment,
    deleteComment ,   
}