const Comment = require("../Model/Comment/Comment");
const appErr = require("../Utils/appErr")

//Create Comment 
const CreateCommentCtrl = async (req,res,next) =>{
    const {post, description} = req.body;
    try{
        const comment = await Comment.create({post,description, user: req.userAuth});
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
        await Comment.findByIdAndDelete(req.params.id)
        res.json({
            status: "success",
            data: "All Comment Successfully Deleted"
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