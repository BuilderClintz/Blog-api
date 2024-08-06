const express = require('express');
const { allUsers, login, register, singleUser, updateUser, deleteUser, profilePhotoUploadeCtrl, whoViewMyProfileCtrl, FollowingCtrl, unfollowCtrl, blockedUserCtrl, unblockedUserCtrl, adminBlockUserCtrl, adminUnblockUserCtrl, } = require('../Controller/UserCtrl');
const isLogin = require('../Middlewares/isLogin');
const multer = require("multer");
const storage = require('../Config/cloudinary');

const userRouter = express.Router();

//instance of multer 
const upload = multer({storage})


 


//register user
userRouter.post("/register", register);

//login user
userRouter.post("/login", login);

//All user
userRouter.get("/", allUsers);

//single user
userRouter.get("/profile",isLogin, singleUser );

//update user
userRouter.put("/profile/:id", updateUser);

//delete user
userRouter.delete("/profile/:id", deleteUser);

//GET/api/v1/users/profile-viewers/id
userRouter.get("/profile-viewers/:id",isLogin, whoViewMyProfileCtrl)

userRouter.get ("/following/:id", isLogin, FollowingCtrl)

//GET/api/v1/users/unfollowing/:id
userRouter.get("/unfollowing/:id", isLogin, unfollowCtrl)

//GET/api/v1/users/Blocked/:id
userRouter.get("/block/:id", isLogin, blockedUserCtrl)

//GET/api/v1/users/unblocked/:id
userRouter.get("/unblock/:id", isLogin, unblockedUserCtrl)

//PUT/api/v1/users/admin-block/:id
userRouter.put("/admin-block/:id", isLogin, adminBlockUserCtrl)

//PUT/api/v1/users/admin-unblock/:id
userRouter.put("/admin-unblock/:id", isLogin, adminUnblockUserCtrl)


//POST/api/v1/user/profile-photo-upload
userRouter.post(
    "/profile-photo-upload",
    isLogin,
    upload.single("profile"),
    profilePhotoUploadeCtrl
);


module.exports = userRouter