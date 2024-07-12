const express = require("express");
const app = express();
const dotenv = require("dotenv");
require("dotenv").config();
require("./Config/dbConnect");
const userRouter = require("./Route/userRoutes.js");
const postRouter = require("./Route/postRoutes.js")
const CommentRouter = require("./Route/commentRoutes.js");
const CategoryRouter = require("./Route/categoryRoutes.js")


//Middleware
app.use(express.json());
const userAuth = {
    isLogin: true,
    isAdmin: false,
};
app.use((req,res,next) => {
    if (userAuth.isLogin){
        next();
    }else{
        return res.json({
            msg:"invalid login credentails",
        });
    }
})

//---User--
app.use("/api/v1/user", userRouter)
app.use("/api/v1/post", postRouter)
app.use("/api/v1/comment", CommentRouter )
app.use("/api/v1/category", CategoryRouter)





const PORT = process.env.PORT || 8000
app.listen(PORT, console.log(`server is running on ${PORT}`))





// const PORT = process.env.PORT||9000

// app.listen(PORT,console.log(`server is running on ${PORT} on iremide laptop and Mr. Tunder is the tutor`))