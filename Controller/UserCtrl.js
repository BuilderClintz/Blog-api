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

module.exports = {
    login,
    allUsers,
    register,
    singleUser,
    updateUser,
    deleteUser
}