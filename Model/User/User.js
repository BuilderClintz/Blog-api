const mongoose = require("mongoose")
const userSchema = new mongoose.Schema(
    {
        firstName : {
            type : String,
            require : [true,"First Name is required" ]

        },
        lasttName : {
            type : String,
            require : [true,"Last Name is required" ]
            
        },
        profilePhoto : {
            type : String,
                       
        },
        email : {
            type : String,
            require : [true,"Email is required" ]
                       
        }

    }

)