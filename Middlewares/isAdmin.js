const User = require("../Model/User/User");
const appErr = require("../Utils/appErr");
const getTokenHeader = require("../Utils/getTokenFromHeader");
const verifyToken = require("../Utils/verifyToken");

const isAdmin = async (req, res, next) => {
    //get token from Headers
    const token = getTokenHeader(req);
    //verify token
    const decodedUser = verifyToken(token)
    //save the user into req obj
    req.userAuth = decodedUser.id;
    //find the user in DB
    const user = await User.findById(decodedUser.id);
    if (user.isAdmin){
        return next();
    }else{
        return next(appErr("Acces denied,Admin Only" ,404));
    }
}

module.exports = isAdmin;