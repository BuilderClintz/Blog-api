
const express = require('express');
const { AllCategory, SingleCategory, UpdateCategory, DeleteCategory } = require('../Controller/CategoryCtrl');
const CategoryRouter = express.Router()


//All Category
CategoryRouter.get("/", AllCategory);


//single Category
CategoryRouter.get("/profile/:id", SingleCategory);


//update Category
CategoryRouter.put("/profile/:id", UpdateCategory);

//delete Category
CategoryRouter.delete("/profile/:id", DeleteCategory);


    module.exports = CategoryRouter