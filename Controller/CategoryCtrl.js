const Category = require("../Model/Category/Category");
const appErr = require("../Utils/appErr");



//Create category 
const createCategoryCtrl = async (req, res, next ) =>{
    const { title } = req.body;
    try {
        const category = await Category.create({title, user: req.userAuth});
        res.json({
            status: "success",
            data: category,
        });
    } catch (error) {
        next(appErr(error.message))
    }
};

//All Category
 const AllCategoryCtrl =  async (req,res,next)=>{
    try {
        const categories = await Category.find();
        res.json({
            status: "success",
            data: categories,
        })
    } catch (error) {
       next(appErr(error.message))
    }
};

//Fetch single Category
const fetchSingleCategoryCtrl= async (req,res,nex)=>{
    try {
        const category =  await Category.findById(req.params.id)
        res.json({
            status: "success",
            data: category
        })
    } catch (error) {
        next(appErr(error.message))
    }
};

//update Category
const UpdateCategoryCtrl = async (req,res,next)=>{
    const {title} = req.body;
    try {
        const category = await Category.findByIdAndUpdate(req.params.id,
            { title },
            {new: true, runValidators: true}
        )
        res.json({
            status: "success",
            data: category
        })
    } catch (error) {
        next(appErr(error.message))
    }
}
//delete Category
const deleteCategoryCtrl = async (req,res,next)=>{
    try {
        const DeleteCategory = await Category.findByIdAndDelete(req.params.id)
        res.json({
            status: "success",
            data: "All Category successfully deleted"
        })
    } catch (error) {
       next(appErr(error.message))
    }
};

    module.exports = {
        createCategoryCtrl,
        AllCategoryCtrl,
        fetchSingleCategoryCtrl,
        UpdateCategoryCtrl,
        deleteCategoryCtrl,
    }