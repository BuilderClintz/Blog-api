const mongoose = require("mongoose");
const Post = require("../Post/Post");
const appErr = require("../../Utils/appErr");
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

userSchema.pre("findOne", async function (next){
    //get the user id 
    const userId = this._conditions._id;
    //find the post created by the user 
    const posts = await Post.find({ user: userId});
    //get the last post created by the user 
    const lastPost = posts[posts.length - 1];
    

    //get the last post date 
    const lastPostDate = new Date(lastPost?.createdAt);
    //get the last post date in string format 
    const lastPostDateStr = lastPostDate.toDateString();
    console.log(lastPostDateStr);
    //add virtual to the schema
    userSchema.virtual("lastPostDate").get(function (){
        return lastPostDateStr;
    });
    //--------check if user is inactive for 30 days 
    //get current date 
    const  currentDate = new Date();
    //get the difference betweeen last post date and the current date 
    const diff = currentDate - lastPostDate;

    //get the difference between in days and return less than in days 
    const diffInDays = diff / (1000 * 3600 * 24)
    if (diffInDays > 30 ) {
        // Add virtuals isInactive to the schema too check if a  user is inactive for 30 days 
        userSchema.virtual("isInactive").get(function (){
            return true;
        });
        //Find the User by ID and update 
        await User.findByIdAndUpdate(
            userId,
            {
                isBlocked: true,
            },
            {
                new: true,
            },
        );
    }else {
        userSchema.virtual("isInactive").get(function (){
            return false;
        });
        //Find the user by ID and update 
        await User.findByIdAndUpdate(
            userId,
            {
                isBlocked: false,
            },
            {
                new: true,
            }
        );
    }
        //------last Active Date ------
        //convert to days ago, for example 1 day ago 
        const daysAgo = Math.floor(diffInDays)
        //add virtuals lastActive in days to the schema
        userSchema.virtual("lastActive").get(function (){
            //check if daysAgo is less than 0 
            if (daysAgo <= 0 ) {
                return "Today";
            }
            //check if daysAgo is equal to 1
            if (daysAgo === 1){
                return "Yesterday";
            }
            //check if daysAgo is greater than 1
            if (daysAgo > 1 ){
                return `${daysAgo} days ago`
            }
        });
        //----------------------------------
        //Update userAward based on the number of posts 
        //----------------------------------
        //get the number of posts
        const numberofPosts = posts.length;
        //check if the number of posts is less than 10
        if (numberofPosts < 10 ){
            await User.findByIdAndUpdate(
                userId,
                {
                    userAward: "Bronze",
                },
                {
                    new:true,
                }
            );
        }
        //check if the number of posts is greater than 10 
        if (numberofPosts > 10) {
            await User.findByIdAndUpdate(
                userId,
                {
                    userAward: "Silver",
                },
                {
                    new:true,
                }
            );
        }
        //check if the number os posts is greater than 20
        if (numberofPosts > 20 ){
            await User.findByIdAndUpdate(
                userId,
                {
                    userAward: "Gold",
                },
                {
                    new: true,
                }
            );
        }
    next()
});


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
// module.exports = User;
module.exports = User; 