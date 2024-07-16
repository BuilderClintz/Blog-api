const express = require('express');
const { allUsers, login, register, singleUser, updateUser, deleteUser, } = require('../Controller/UserCtrl');
const isLogin = require('../Middlewares/isLogin');
const userRouter = express.Router();


//register user
userRouter.post("/register", register);

//login user
userRouter.post("/login", login);

//All user
userRouter.get("/", allUsers);

//single user
userRouter.get("/profile/:id",isLogin, singleUser );

//update user
userRouter.put("/profile/:id", updateUser);

//delete user
userRouter.delete("/profile/:id", deleteUser);


module.exports = userRouter