
const Post = require("../Model/Post/Post");
const User = require("../Model/User/User");
const appErr = require("../Utils/appErr");


//create post
const createPostCtrl = async ( req,res, next) =>{
    const { title , description, category } = req.body;
    try {
        //Find the user 
        const author = await User.findById(req.userAuth);

        // CHECK IF THE USER IS BLOCKED
        if(author.isBlocked){
            return next(appErr("Accesss denied, account is blocked", 403))
        }
        //create the post 
        const postCreated = await Post.create({
            title,
            description,
            category,
            user: author._id,
        });
        //Associate user to a post - Push the post into posts
        author.posts.push(postCreated);
        await author.save();
        res.json({
            status: "success",
            data: postCreated,
        })
    } catch (error) {
      res.json(error.message)  
    }
}

//single Post
const SinglePost = async ( req,res) =>{
    try {
        const userPost = await Post.findById(req.params.id); 
        //find the user who made a single 
        res.json({
            status: "success",
            data: userPost,
        })
    } catch (error) {
      res.json(error.message)  
    }
}
//toggleLike
const toggleLikesPostCtrl = async (req,res,next) =>{
    try {
        //Get the Post 
        const post = await Post.findById(req.params.id);
        //check if the user has alreadydisliked the post 
        const isDisliked = post.dislikes.includes(req.userAuth);
        //Check if the user has already likes the post 
        const isLiked = post.likes.includes(req.userAuth);

        if (isDisliked){
            return next (
                appErr("You have already disliked this post, kindly Undislike to like the post")
            );
        }else{
            //if the user has already liked this post, unlike the post
            if (isLiked){
                post.likes = post.likes.filter(
                    (like)=>like.toString() !== req.userAuth.toString()
                );
                await post.save();
            }else {
                //if the user has not liked the post,like the post 
                post.likes.push(req.userAuth);
                await post.save();
            }
            res.json({
                status: "success",
                data: post,
            });
        }
    } catch (error) {
        next(error.message)
        
    }
}

//toggle Dislike
const toggleDislikesPostCtrl = async (req,res,next)=>{
    try {
        //Get the Post 
        const post = await Post.findById(req.params.id);
        //check if the user has already disliked the post 
        const isDisliked = post.dislikes.includes(req.userAuth);
        //check if the user has already liked the post 
        const isLiked = post.likes.includes(req.userAuth);
        if (isLiked){
            return next (
                appErr(
                    "You have already liked this post,unlike to dislike the post", 403
                )
            );
        }else {
            //if the user has already liked this post, unlike the post 
            if (isDisliked) {
                post.dislikes = post.dislikes.filter(
                    (dislike)=> dislike.toString() !== req.userAuth.toString()
                );
                await post.save();
            }else{
                //if the user has not liked the post,like the post 
                post.dislikes.push(req.userAuth);
                await post.save();
            }
            res.json({
                status: "success",
                data: post,
            });
        }
    } catch (error) {
        next(error.message);
    }
}

//Post Details
const postDetailsCtrl = async ( req, res, next) => {
    try {
        //find the post 
        const post = await Post.findById(req.params.id);
        //Number of view
        //Check if the user viewed this post 
        const isViewed = await post.numViews.includes(req.userAuth);
        if (isViewed){
            res.json({
                status: "success",
                data: post,
            });
        }else {
            //push into numViews 
            post.numViews.push(req.userAuth);
            await post.save();
            res.json({
                status: "success",
                data: post,
            });
        }
    } catch (error) {
       next(appErr(error.message)) 
    }
}

//All Post (FETCH POST)
const Allpost = async (req,res, next) =>{
    try{
        const posts = await Post.find({})
        .populate("category","title")
        .populate("user");
    //check if the user is blocked by the post owner 
    const filteredPosts = posts.filter(post => {
        //get the blocked users 
        const blockedUsers = post.user.blocked
        const isBlocked = blockedUsers.includes(req.userAuth);

        return !isBlocked
    })
        res.json({
            status: "success",
            data: filteredPosts
        })
    } catch (error) {
        next(appErr(error.message));
    }
}

//update user
const Updatepost= async (req,res,next)=>{
    const { title,description,category} = req.body;
    try {
        // find the post 
        const post = await Post.findById(req.params.id);
        if (post.user.toString() !== req.userAuth.toString()){
            return next (appErr("You are not allowed to upload this post", 403))
        }
        await Post.findByIdAndUpdate(req.params.id,
            { title, description, category, photo: req?.file?.path}
        )
        res.json({
            status: "success",
            data: "update User"
        })
    } catch (error) {
        res.json(error.message)
    }
}
//Delete post
const DeletepostCtrl=  async (req,res,next)=>{
    try {
        //find post to delete 
        const post = await Post.findById(req.params.id)
        if (post.user.toString() !== req.userAuth.toString()){
            return next(appErr("You are not allowed to delete this post"))
        }
            await Post.findByIdAndDelete(req.params.id);

            res.json({
                status: "success",
                data: "Your post has been deleted successfully"
            })
            } catch (error) {
                next(appErr(error.message))
            }
}
module.exports = {
    Allpost,
    SinglePost,
    toggleLikesPostCtrl,
    toggleDislikesPostCtrl,
    postDetailsCtrl,
    Updatepost,
    DeletepostCtrl,
    createPostCtrl,  
}