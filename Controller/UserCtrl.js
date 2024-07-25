const User = require("../Model/User/User")
const bcrypt = require("bcryptjs");
const generateToken = require("../Utils/generateToken");
const appErr = require("../Utils/appErr");

//Register
const register = async (req,res) =>{
    const { firstName, lastName, profilePhoto , email, password } = req.body;

    try{
        //check if email is existing
        const userFound = await User.findOne ({email});
        if (userFound){
            return res.json ({
                msg: "User already exists",
            });   
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //create the user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashPassword,
        });
        res.json({
            status: "success",
            data: user
        })
    } catch (error) {
       next(appErr(error.message));
    }
};

//Login
const login = async (req,res, next) =>{
    const login = {email, password} = req.body;
    try{
        //check if email exists
        const userFound = await User.findOne({email});
        if (!userFound) {
            return next(appErr("Invalid credentials", 400));
        }
        //check valid password
        const isPasswordMatched = await bcrypt.compare( password, userFound.password);
        if (!isPasswordMatched){
            return next(appErr("Invalid credentials", 400))
        }
        res.json({
            status: "success",
            data: {
                id: userFound._id,
                firstName: userFound.firstName,
                email: userFound.email,
                isAdmin: userFound.isAdmin,
                toke: generateToken(userFound._id)
            }
        })
    } catch (error) {
       next(appErr(error.message))
    }
}

//All Users
const allUsers = async (req,res, next) =>{
    try{
        res.json({
            status: "success",
            data: "All User"
        })
    } catch (error) {
        next(appErr(error.message))
    }
}

//single User
const singleUser =  async (req,res)=>{
    const { id } = req.params;
    const user = await User.findById(id);
    try {
        res.json({
            status: "success",
            data: user,
        })
    } catch (error) {
       next(appErr(error.message))
    }
};

//update user
const updateUser = async (req,res)=>{
    try {
        res.json({
            status: "success",
            data: "update User"
        })
    } catch (error) {
        res.json(error.message)
    }
}

const deleteUser =  async (req,res)=>{
    try {
        res.json({
            status: "success",
            data: "delete User"
        })
    } catch (error) {
        res.json(error.message)
    }
}
//who view user profile
const whoViewMyProfileCtrl = async (req,res,next) => {
    try {
        // 1. find the original user 
        const user = await User.findById(req.params.id);

        //2. find the user who viewed the profile
        const userWhoViewed = await User.findById(req.userAuth);

        //3. check if userWhoViewed is already in the user viewers array 
        if (user && userWhoViewed){
            //4. check if userWhoViewed is already in the user viewers array 
            const isUserAlreadyViewed = user.viewers.find ((viewer) => viewer.toString() === userWhoViewed._id.toJSON()
        );
        if (isUserAlreadyViewed){
            return next (appErr("You already viewed this profile"));
        } else {
            // 5. push the userWhoViewed into the User's viewers array 
            user.viewers.push(userWhoViewed._id);
            //6. save the user
            await user.save();
            res.json({
                status: "success",
                msg: "You have succeessfully viewed this profile",
                data: user.viewers,
            });
        }
     }
} catch (error) {
    next(error.message, 500);
}
}
const profilePhotoUploadeCtrl = async ( req, res, next) =>{
    try {
        //1 find the user to be update
        const userToUpdate = await User.findById(req.userAuth);
        //2 check if user found 
        if (!userToUpdate){
            return next(appErr("User not Found", 403));
        }
        //check if user is blocked
        if (userToUpdate.isBlocked){
            return next(appErr("Action not allowed, your acount is blocked", 403));
        }
        if (req.file){
            await User.findByIdAndUpdate(
                req.userAuth,
                {
                    $set:{
                        profilePhoto:req.file.path,
                    },
                },
                {
                    new: true,
                }
            );
            res.json({
                status: "success",
                data: "You have successfully updated your profile photo",
            });
        }
    } catch (error) {
        nexr(appErr(error.message, 500))
        
    }
}

//Following 
const FollowingCtrl = async (req, res , next) => {
    try {
        //1. Find the user to follow 
        const userToFellow = await User.findById(req.params.id);

        //2. find the user who is following 
        const userWhoFellowed = await User.findById(req.userAuth);

        //check if user and userWhoFollowed are found 
        if (userToFellow && userWhoFellowed){
            //4. check if userWhoFollowed is already in the user's fellowers array 
            const isUserAlreadyFollowed = userToFellow.followers.find((follower) => follower.toString() ===userWhoFellowed._id.toString()
        );
        if (isUserAlreadyFollowed){
            return next (appErr("You already followed the user"));
        }else {
            //5. push userWhoFollowed in to the user's follower array
            userToFellow.followers.push(userWhoFellowed._id);
            //6. push userToFollow to the userwhoFollowed following array 
            userWhoFellowed.following.push(userToFellow._id)
            //7.save
            await userWhoFellowed.save()
            await userToFellow.save();

            res.json({
                status: "success",
                message: "You have successfully this user",
                follower: userToFellow.followers,
                following: userWhoFellowed.following,
            });
          }
        }
    } catch (error) {
        next(appErr(error.message));
    }
}
//Unfollow
const unfollowCtrl = async (req, res, next) => {
    try {
        //1. find the user to unfollow 
        const userToBeUnfollowed = await User.findById(req.params.id);
        //2. find the user who is following 
        const userWhoUnfollowed = await User.findById(req.userAuth);
        //3. check if the users are found
        if (userToBeUnfollowed && userWhoUnfollowed){
            //4. check if userwhoUnfollowed is already in the user's follower array
            const isUserAlreadyFollowed = userToBeUnfollowed.followers.find((follower)=> follower.toString() === userWhoUnfollowed._id.toString()
        );
        if (!isUserAlreadyFollowed){
            return next(appErr("You have not followed this user"))
        }else{
            //5. Remove userWhoUnfollowed from the user's follwer array 
            userToBeUnfollowed.followers = userToBeUnfollowed.followers.filter(
                 (follower) => follower.toString() !== userWhoUnfollowed._id.toString()
                );

        //6. save the user 
        await userToBeUnfollowed.save();

        //7. remove userToBeUnfollowed from the userWhoUnfollowed's following array 
        userWhoUnfollowed.following = userToBeUnfollowed.following.filter(
            (following) => following.toString() !== userToBeUnfollowed._id.toString()
        );
        //8. save the user 
        await userWhoUnfollowed.save();
        res.json({
            status: "success",
            msg: "You have successfully unfollowed the user",
            usertobeunfollowed : userToBeUnfollowed.followers,
            userwhounfollowed : userWhoUnfollowed.following,
        });
       }
      }
    } catch (error) {
        next(appErr(error.message));
    }
};

module.exports = {
    login,
    allUsers,
    register,
    singleUser,
    updateUser,
    deleteUser,
    profilePhotoUploadeCtrl,
    whoViewMyProfileCtrl,
    FollowingCtrl,
    unfollowCtrl
}