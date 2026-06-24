import express from "express";
import {
  authenticateUser,
  authorizeAdmin,
} from "../middlewares/authMiddleware.js";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
  createRazorpayOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router
  .route("/")
  .post(authenticateUser, createOrder)
  .get(authenticateUser, authorizeAdmin, getAllOrders);

router.route("/mine").get(authenticateUser, getUserOrders);

router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales").get(calculateTotalSales);
router.route("/total-sales-by-date").get(calculateTotalSalesByDate);
router.route("/:id").get(authenticateUser, findOrderById);
router.route("/:id/pay").put(authenticateUser, markOrderAsPaid);
router.route("/:id/razorpay-order").post(authenticateUser, createRazorpayOrder);
router
  .route("/:id/deliver")
  .put(authenticateUser, authorizeAdmin, markOrderAsDelivered);

export default router;
