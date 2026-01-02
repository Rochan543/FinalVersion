const express = require("express");
const multer = require("multer");
const {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus,
  sendPaymentRequest,
} = require("../controllers/booking-controller");

// 🔒 IMPORT AUTH MIDDLEWARE (ADDED – NO LOGIC CHANGE)
const {
  authMiddleware,
} = require("../controllers/auth/auth-controller");

const router = express.Router();

/* ==============================
   MULTER CONFIG
================================ */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* ==============================
   USER ROUTES
   (ONLY PROTECTED – NOT MODIFIED)
================================ */

// ✅ Booking will now be linked to logged-in user
router.post("/create", authMiddleware, createBooking);

// ✅ User bookings will work correctly
router.get("/user", authMiddleware, getUserBookings);

/* ==============================
   ADMIN ROUTES
================================ */

router.get("/admin/all", getAllBookings);

router.put("/admin/:id/status", updateBookingStatus);

// 🔥 ADMIN: UPLOAD QR + SEND EMAIL
router.post(
  "/admin/:id/payment-qr",
  upload.single("qr"),
  sendPaymentRequest
);

module.exports = router;
