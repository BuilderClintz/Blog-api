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
        Category: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Category",
            required:[true,"Post category is required"],
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
        User:{
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
    }
);

//compile the user model
const Post = mongoose.model("Post",postSchema);

module.exports = Post;
