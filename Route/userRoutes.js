const express  = require("express");
const useRouter = express.Router();

//register User 
useRouter.post("/register", async (req, res) => {
    try {
        res.json({
           status : "success",
           data: "User registered successfully", 
        });
    } catch (error) {
        res.json(error.message)
    }
});

//Login User 

useRouter.post("/login", async (req, res) => {
    try {
        res.json({
           status: "success",
           data: "User Login successfully", 
        });
    } catch (error) {
        res.json(error.message)
    }
});

//All users
useRouter.post("/", async (req, res) => {
    try {
        res.json({
           status: "success",
           data: "All Users",
        });
    } catch (error) {
        res.json(error.message)
    }
});

//Single User 
useRouter.get("/profile/:id", async (req, res) => {
    try {
        res.json({
           status: "success",
           data: "Users Found Successfully",
        });
    } catch (error) {
        res.json(error.message);
    }
});

useRouter.delete("/profile/:id", async (req, res) => {
    try {
        res.json({
           status: "success",
           data: "Delete Users",
        });
    } catch (error) {
        res.json(error.message)
    }
});

module.exports = useRouter;

