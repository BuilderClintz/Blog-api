//All Users
const allComments = async (req,res) =>{
    try{
        res.json({
            status: "success",
            data: "All User"
        })
    } catch (error) {
        res.json(error.message)
    }
}

//single User
const singleComment =  async (req,res)=>{
    try {
        res.json({
            status: "success",
            data: "single User"
        })
    } catch (error) {
        res.json(error.message)
    }
}

//update user
const updateComment = async (req,res)=>{
    try {
        res.json({
            status: "success",
            data: "update User"
        })
    } catch (error) {
        res.json(error.message)
    }
}

const deleteComment =  async (req,res)=>{
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
    allComments,
    singleComment,
    updateComment,
    deleteComment ,   
}