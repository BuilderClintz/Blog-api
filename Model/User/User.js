const mongoose = require("mongoose");
const Post = require("../Post/Post");
const userSchema = new mongoose.Schema(
    {
        firstName : {
            type : String,
            required: [true,"First Name is required" ]

        },
        lastName : {
            type : String,
            required : [true,"Last Name is required" ]
        },
        profilePhoto : {
            type : String,         
        },
        email : {
            type : String,
            required: [true,"Email is required" ],
             
        },
        password: {
            type:String,
            required: [true,"Password is required"],
        },
        isBlocked:{
            type:Boolean,
            default: false,
        },
        isAdmin: {
            type:Boolean,
            default:false,
        },
        role: {
            type: String,
            enum :["Admin","Guest","Editor"],
        },
        viewers:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
            },
        ],
        followers:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
        ],
        following:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
            },
        ],
        posts: [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Post",
            },
        ],
        blocked: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"user"
            }
        ],
        // plan:[
        //     {
        //         type: String,
        //         enum : ["free","Premium","Pro"],
        //         default:"Free",
        //     }
        // ],
        userAward : {
            type:String,
            enum:["Bronze","Silver","Gold"],
            default:"Bronze",
        },
    },
    {
        timestamps:true,
        toJSON: {virtuals:true},
    }

    
);

userSchema.pre("findOne",async function (next){
    //get the user id 
    const userId = this._conditions._id;
    //find the post created by the user 
    const posts = await Post.find({ user: userId});
    //get the last post created by the user 
    const lastPost = posts[posts.length - 1];
    

    //get the last post date 
    // const lastPostDate = new Date(lastPost.createdAt);
    // //get the last post date in string format 
    // const lastPostDateStr = lastPostDate.toDateString();
    // console.log(lastPostDateStr);
    // //add virtual to the schema
    // userSchema.virtual("lastPostDate").get(function (){
    //     return lastPostDateStr;
    // });
    // next()
})

//Add Fullname 
userSchema.virtual("fullname").get(function(){
    return `${this.firstName} ${this.lastName}`
})

//Get initial
userSchema.virtual("initials").get(function() {
    return `${this.firstName[0]} ${this.lastName[0]}`
});

//ADD Postcount
userSchema.virtual("PostCount").get(function(){
    return this.posts.length
})
//ADD Fellowers Count
userSchema.virtual("FollowersCounts").get(function(){
    return this.followers.length
})
//Add fellowing count
userSchema.virtual("FollowingCounts").get(function(){
    return this.following.length
})
//Add Viewers count
userSchema.virtual("ViewerCounts").get(function(){
    return this.viewers.length
})
//Add Blocked count
userSchema.virtual("BlockedCounts").get(function(){
    return this.blocked.length
})



// compile the user model
const User = mongoose.model("User", userSchema);
module.exports = User;