const getTokenHeader = require("../Utils/getTokenFromHeader");
const verifyToken = require("../Utils/verifyToken");

const isLogin = (req,res, next) => {
    //get token from Headers
    const token = getTokenHeader(req);
    //verify token
    const decodedUser = verifyToken(token)
    //save the user into req obj
    req.userAuth = decodedUser.id;
    if (!decodedUser){
        return res.json({
            msg:"Invalid/Expired Token, please login again",
        });
    }else{
        next();
    }
}

module.exports = isLogin;