
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
const Updatepost= async (req,res)=>{
    try {
        res.json({
            status: "success",
            data: "update User"
        })
    } catch (error) {
        res.json(error.message)
    }
}
//Delete post
const Deletepost=  async (req,res)=>{
    try {
        res.json({
            status: "success",
            data: "delete User"
        })
    } catch (error) {
        res.json(error.message)
    }
}

module.exports = {
    Allpost,
    SinglePost,
    Updatepost,
    Deletepost,   
    createPostCtrl,  
}