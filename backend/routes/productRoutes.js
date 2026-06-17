import express from "express";
import formidable from "express-formidable";
import { authenticateUser,authorizeAdmin } from "../middlewares/authMiddleware.js";

import { addProduct , updateProductDetails , removeProduct , fetchProducts , fetchProductById , fetchAllProducts , addProductReview , fetchTopProducts, fetchNewProducts} from "../controllers/productController.js";

import checkId from "../middlewares/checkId.js";


const router = express.Router();
router.route("/").get(fetchProducts).post(authenticateUser,authorizeAdmin ,formidable() , addProduct);
router.route("/allproducts").get(fetchAllProducts);
router.route("/top").get(fetchTopProducts);
router.route("/new").get(fetchNewProducts);
router.route("/:id")
    .get(fetchProductById)
    .put(authenticateUser,authorizeAdmin ,formidable(), updateProductDetails)
    .delete(authenticateUser , authorizeAdmin , removeProduct);
router.route("/:id/reviews").post(authenticateUser,authorizeAdmin,checkId ,addProductReview);


export default router;
