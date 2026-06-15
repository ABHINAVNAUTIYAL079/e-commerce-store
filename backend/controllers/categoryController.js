import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        if(!name){
            return res.json({error : "Name is Required"})
        }
        const existingCategory = await Category.findOne({name});

        if(existingCategory){
            return res.json({error : "Already exists"})
        }

        const category = await new Category({name}).save();
        res.status(201).json({
            success : true,
            category
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message : error.message
        })
    }   
})

const updateCategory = asyncHandler(async (req , res) => {
    try {
        const { name } = req.body;
        const { categoryId } = req.params;

        if(!name){
            return res.json({error : "Name is Required"})
        }

        const category = await Category.findById(categoryId);

        if(!category){
            return res.json({error : "Category not found"})
        }

        category.name = name;
        await category.save();

        res.status(200).json({
            success : true,
            category
        })
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message : error.message
        })
    }
})

const removeCategory = asyncHandler(async (req , res) => {
    const { categoryId } = req.params;

    try {
        const category = await Category.findById(categoryId);

        if(!category){
            return res.json({error : "Category not found"})
        }

        await category.deleteOne();
        res.status(200).json({
            success : true,
            category
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message : error.message
        })
    }
})

const listCategory = asyncHandler(async (req , res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json({
            success : true,
            categories
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message : error.message
        })
    }
})

const readCategory = asyncHandler(async (req , res) => {
    const { categoryId } = req.params;
    try {
        const category = await Category.findById(categoryId);
        if(!category){
            return res.json({error : "Category not found"})
        }
        res.status(200).json({
            success : true,
            category
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message : error.message
        })
    }
})

export { createCategory , updateCategory , removeCategory , listCategory ,readCategory} ;