const express = require("express");
const {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
} = require("../../controllers/shop/order-controller");

const {
  authMiddleware,
} = require("../../controllers/auth/auth-controller"); // ✅ REQUIRED

const router = express.Router();

router.post("/create", createOrder);
router.post("/capture", capturePayment);

// 🔒 PROTECTED – USER ORDERS
router.get("/list", authMiddleware, getAllOrdersByUser);

router.get("/details/:id", getOrderDetails);

module.exports = router;
