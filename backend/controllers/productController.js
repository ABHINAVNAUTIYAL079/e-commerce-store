import Product from "../models/productModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const addProduct = asyncHandler(async (req , res)=>{
    try {
        const {name , description , price , category , quantity , brand} = req.fields;

        switch(true){
            case !name : return res.json({error : "Name is Required"})
            case !description : return res.json({error : "Description is Required"})
            case !price : return res.json({error : "Price is Required"})
            case !category : return res.json({error : "Category is Required"})
            case !quantity : return res.json({error : "Quantity is Required"})
            case !brand : return res.json({error : "Brand is Required"})
        }

        const product = new Product({...req.fields});

        await product.save();
        return res.json({
            success : true,
            product
        })  
    
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message : error.message
        })
    }
})

const updateProductDetails = asyncHandler(async (req , res) => {
    try {
        const {name , description , price , category , quantity , brand} = req.fields;

        switch(true){
            case !name : return res.json({error : "Name is Required"})
            case !description : return res.json({error : "Description is Required"})
            case !price : return res.json({error : "Price is Required"})
            case !category : return res.json({error : "Category is Required"})
            case !quantity : return res.json({error : "Quantity is Required"})
            case !brand : return res.json({error : "Brand is Required"})
        }

        const product = await Product.findByIdAndUpdate(req.params.id , {...req.fields} , {new : true});

        await product.save();
        return res.json({
            success : true,
            product
        })
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message : error.message
        })
    }
})

const removeProduct = asyncHandler(async (req , res ) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        return res.json({
            success : true,
            product
        })
    } catch (error) {
     console.error(error);
     return res.status(400).json({
        error : "Server Error"
     })
    }
})

const fetchProducts = asyncHandler(async (req , res) => {
    try {
        const pageSize = 6;
        const keyword = req.query.keyword ? {name : {
            $regex : req.query.keyword,
            $options : "i"
        }} : {};

        const count = await Product.countDocuments({...keyword});

        const products = await Product.find({...keyword}).limit(pageSize);

        res.status(200).json({
            products,
            page : 1,
            pages : Math.ceil(count/pageSize),
            hasMore : false
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error : "Server Error"
        })
    }
})

const fetchProductById = asyncHandler(async (req , res) => {
    try {
        const product = await Product.findById(req.params.id);

        if(!product){
            res.status(404);
            throw new Error("Product Not Found.")
        }
        return res.json(
            product
        )
    } catch (error) {
        console.error(error);
        return res.status(404).json({
            error : "Product Not Found."
        })
    }
})

const fetchAllProducts = asyncHandler(async (req , res) => {
    try {
        const products = await Product.find({}).populate("category").limit(12).sort({createAt : -1});
        return res.json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error : "Server Error"
        })
    }
})

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const fetchTopProducts = asyncHandler(async (req , res) => {
    try {
        const products = await Product.find({}).sort({rating : -1}).limit(4);
        return res.json(products);
    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
});

const fetchNewProducts = asyncHandler(async (req , res) => {
    try {
        const products = await Product.find({}).sort({_id : -1}).limit(4);
        return res.json(products);
    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
});



export {addProduct , updateProductDetails , removeProduct ,fetchProducts , fetchProductById , fetchAllProducts , addProductReview , fetchTopProducts, fetchNewProducts};