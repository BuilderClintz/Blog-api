const mongoose = require("mongoose");
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
        plan:[
            {
                type: String,
                enum : ["free","Premium","Pro"],
                default:"Free",
            }
        ],
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

// compile the user model
const User = mongoose.model("User", userSchema);
module.exports = User;