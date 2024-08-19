const Category = require("../Model/Category/Category")
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

//single Comment 
const singleComment =  async (req,res,next)=>{
    try {
        const comment = await Comment.findbyId(req.params.id)
        res.json({
            status: "success",
            data: comment
        })
    } catch (error) {
        next(appErr(error.message))
    }
}

//update Comment 
const updateComment = async (req,res,next)=>{
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id,
            { title },
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
        const DeleteComment = await Comment.findByIdAndDelete(req.params.id)
        res.json({
            status: "success",
            data: "All Comment Successfully Deleted"
        })
    } catch (error) {
         next(appErr(error.message))
    }
}

module.exports = {
    CreateCommentCtrl,
    singleComment,
    updateComment,
    deleteComment ,   
}