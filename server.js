const express = require("express")
const app = express()
const dotenv = require("dotenv")
const useRouter = require("./Route/userRoutes")
require("dotenv").config()
require("./Config/dbConnect")

//---Use---
app.use("app/v1/user", useRouter)


app.post("/api/v1/user/register", (req,res)=>{
    try {
        res.json({
            status: "success",
            data: "User register successfully"
        })
    } catch (error) {
        res.json(error.message)
        
    }
})

app.post("/api/v1/user/Login", (req,res)=>{
    try {
        res.json({
            status: "success",
            data: "User Login successfully"
        })
    } catch (error) {
        res.json(error.message)
        
    }
})

app.post("/api/v1/user/Update", (req,res)=>{
    try {
        res.json({
            status: "success",
            data: "User Updated successfully"
        })
    } catch (error) {
        res.json(error.message)
        
    }
})

app.delete("/api/v1/user/:id", async (req, res)=> {
    try {
        res.json({
            status: "success",
            data: "User deleted successfully"
        })
    } catch (error) {
        res.json(error.message)
        
    }
})





const PORT = process.env.PORT || 8000
app.listen(PORT, console.log(`server is running on ${PORT}`))





// const PORT = process.env.PORT||9000

// app.listen(PORT,console.log(`server is running on ${PORT} on iremide laptop and Mr. Tunder is the tutor`))