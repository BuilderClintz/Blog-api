//All Users
const Allpost = async (req,res) =>{
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
const Singlepost =  async (req,res)=>{
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
const Updatepost= async (req,res)=>{
    try {
        res.json({
            status: "success",
            data: "update User"
        })
    } catch (error) {
        res.json(error.message)
    }
}

const Deletepost=  async (req,res)=>{
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
    Allpost,
    Singlepost,
    Updatepost,
    Deletepost,   
}