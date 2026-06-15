import express from "express";
import { createCategory , updateCategory , removeCategory,listCategory, readCategory } from "../controllers/categoryController.js";
import { authenticateUser, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(authenticateUser, authorizeAdmin, createCategory);
router.route("/:categoryId").put(authenticateUser, authorizeAdmin, updateCategory);
router.route("/:categoryId").delete(authenticateUser, authorizeAdmin, removeCategory);
router.route("/categories").get(listCategory);
router.route("/:categoryId").get(readCategory);

export default router;