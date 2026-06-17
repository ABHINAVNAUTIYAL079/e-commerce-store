import express from "express";
import formidable from "express-formidable";
import { authenticateUser,authorizeAdmin } from "../middlewares/authMiddleware.js";

import { addProduct , updateProductDetails , removeProduct , fetchProducts , fetchProductById , fetchAllProducts} from "../controllers/productController.js";
import checkId from "../middlewares/checkId.js";


const router = express.Router();

router.route("/").get(fetchProducts).post(authenticateUser,authorizeAdmin ,formidable() , addProduct);

router.route("/allproducts").get(fetchAllProducts);
router.route("/:id")
    .get(fetchProductById)
    .put(authenticateUser,authorizeAdmin ,formidable(), updateProductDetails)
    .delete(authenticateUser , authorizeAdmin , removeProduct);
export default router;
