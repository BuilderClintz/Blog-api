
//All Category
 const AllCategory =  async (req,res)=>{
    try {
        res.json({
            status: "success",
            data: "all Category"
        })
    } catch (error) {
        res.json(error.message)
    }
};


//single Category
const SingleCategory = async (req,res)=>{
    try {
        res.json({
            status: "success",
            data: "single Category"
        })
    } catch (error) {
        res.json(error.message)
    }
}


//update Category
const UpdateCategory = async (req,res)=>{
    try {
        res.json({
            status: "success",
            data: "update Category"
        })
    } catch (error) {
        res.json(error.message)
    }
}

//delete Category
const DeleteCategory = async (req,res)=>{
    try {
        res.json({
            status: "success",
            data: "delete Category"
        })
    } catch (error) {
        res.json(error.message)
    }
};

    module.exports = {
        AllCategory,
        SingleCategory,
        UpdateCategory,
        DeleteCategory
    }