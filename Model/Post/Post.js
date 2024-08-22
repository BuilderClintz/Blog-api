const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        title: {
            type :String,
            required: [true,"Post title is required"],
            trim : true,
        },
        description: {
            type: String,
            required: [true,"Post description is required"],
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Category",
           
        },
        numViews: [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
            },
        ],
        likes:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
            },
        ],
        dislikes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"User",
            },
        ],
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: [true,"Please Author is required"],
        },
        photo:{
            type: String,
        },
    },
    {
        timestamps: true, 
        toJSON: { virtuals: true },
    }
);

postSchema.pre (/^find/, function(next){
    // add views count as virtual field
    postSchema.virtual("viewsCount").get(function(){
        const post = this;
        return post.numViews.length;
    })
    //add views like count as virtual field 
    postSchema.virtual("likesCount").get(function(){
        const post = this;
        return post.likes.length;
    })
    //add views dislike count as virtual field 
    postSchema.virtual("disLikeCount").get(function(){
        const post = this;
        return post.dislikes.length;
    })
    next(); 
     //check the most liked post in percentage 
     postSchema.virtual("likePercentage").get(function(){
        const post = this;
        const total = +post.likes.length + post.dislikes.length
        const percentage = Math.floor ((post.likes.length / total) * 100);
        return `${percentage}%`
    })
     //check the most liked post in percentage 
     postSchema.virtual("dislikePercentage").get(function(){
        const post = this;
        const total = + post.likes.length + post.dislikes.length
        const percentage = Math.floor ((post.likes.length / total) * 100);
        return `${percentage}%`;
    });
    //if days is less than 0 return Today, if day is 1 return Yesterday else return days ago 
    postSchema.virtual("daysAgo").get(function(){
        const post = this;
        const date = new Date (post.createdAt);
        const daysAgo = Math.floor((Date.now()- date) / 86400000);
        return daysAgo === 0 
        ? "Today"
        :daysAgo === 1
        ? "Yesterday"
        : `${daysAgo} days ago `
    });
    
    next();
})

//compile the user model
const Post = mongoose.model("Post",postSchema);

module.exports = Post;
