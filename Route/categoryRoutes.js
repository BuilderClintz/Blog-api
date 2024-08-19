
const express = require('express');
const { AllCategory, SingleCategory, UpdateCategory, DeleteCategory, deleteCategory, fetchSingleCategory, createCategoryCtrl, AllCategoryCtrl, UpdateCategoryCtrl, fetchSingleCategoryCtrl, deleteCategoryCtrl } = require('../Controller/CategoryCtrl');
const isLogin = require('../Middlewares/isLogin');
const CategoryRouter = express.Router()

//Create Category 
CategoryRouter.post("/", isLogin, createCategoryCtrl);

//All Category
CategoryRouter.get("/", AllCategoryCtrl);

//Fetch Single Category
CategoryRouter.get("/:id",isLogin, fetchSingleCategoryCtrl);

//update Category
CategoryRouter.put("/:id",isLogin, UpdateCategoryCtrl);

//delete Category
CategoryRouter.delete("/:id",isLogin, deleteCategoryCtrl);


    module.exports = CategoryRouter