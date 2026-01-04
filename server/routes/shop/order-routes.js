const express = require("express");
const {
  createOrder,
  confirmOrder,
  getAllOrdersByUser,
  getOrderDetails,
} = require("../../controllers/shop/order-controller");

const {
  authMiddleware,
} = require("../../controllers/auth/auth-controller");

const router = express.Router();

/* =========================
   USER ROUTES
========================= */

// 🔒 CREATE ORDER (CONTACT ADMIN / WHATSAPP / CALL FLOW)
router.post("/create", authMiddleware, createOrder);

// 🔒 GET LOGGED-IN USER ORDERS
router.get("/list", authMiddleware, getAllOrdersByUser);

// 🔒 GET SINGLE ORDER DETAILS
router.get("/details/:id", authMiddleware, getOrderDetails);

/* =========================
   ADMIN ROUTES
========================= */

// 🔒 CONFIRM ORDER (STOCK UPDATE)
router.post("/confirm", authMiddleware, confirmOrder);

module.exports = router;
