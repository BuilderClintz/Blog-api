
const Post = require("../Model/Post/Post");
const User = require("../Model/User/User");


//create post
const createPostCtrl = async ( req,res) =>{
    const { title , description } = req.body;
    try {
        //Find the user 
        const author = await User.findById(req.userAuth);
        //create the post 
        const postCreated = await Post.create({
            title,
            description,
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

//All Users
const Allpost = async (req,res) =>{
    try{
        res.json({
            status: "success",
            data: "All User"
        })
    } catch (error) {
        res.json(error.message)
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