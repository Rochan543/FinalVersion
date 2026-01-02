const Booking = require("../models/Booking");
const Order = require("../models/Order");
const { sendPaymentEmail } = require("../utils/email");

/* ===============================
   CREATE BOOKING (USER)
   =============================== */
const createBooking = async (req, res) => {
  try {
    // 🔒 Logged-in user from authMiddleware
    const user = req.user;

    /* ===============================
       CREATE BOOKING (UNCHANGED)
       =============================== */
    const booking = new Booking({
      userId: user.id,
      userName: user.userName,
      email: user.email,

      phone: req.body.phone,
      productId: req.body.productId,
      productName: req.body.productName,
      productImage: req.body.productImage,
      size: req.body.size,
    });

    await booking.save();

    /* ===============================
       CREATE ORDER FROM BOOKING
       (FIELDS ADDED – LOGIC UNCHANGED)
       =============================== */
    await Order.create({
      userId: user.id,

      cartItems: [
        {
          productId: booking.productId,
          title: booking.productName,
          image: booking.productImage,
          price: 0, // price handled later
          quantity: 1,
        },
      ],

      addressInfo: {
        addressId: null,
        address: "",
        city: "",
        pincode: "",
        phone: booking.phone,
        notes: "Created from booking",
      },

      orderStatus: "pending",
      paymentMethod: "offline",
      paymentStatus: "pending",
      totalAmount: 0,

      orderDate: new Date(),
      orderUpdateDate: new Date(),

      paymentId: null,
      payerId: null,
      cartId: null,
    });

    /* ===============================
       RESPONSE (UNCHANGED)
       =============================== */
    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error("CREATE BOOKING ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create booking",
    });
  }
};

/* ===============================
   GET USER BOOKINGS
   =============================== */
const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.find({ userId }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: bookings,
    });
  } catch (err) {
    console.error("USER BOOKINGS ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};

/* ===============================
   ADMIN: GET ALL BOOKINGS
   =============================== */
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error("ADMIN GET BOOKINGS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};

/* ===============================
   ADMIN: UPDATE BOOKING STATUS
   =============================== */
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({ success: true });
  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update booking status",
    });
  }
};

/* ===============================
   ADMIN: SEND PAYMENT REQUEST
   =============================== */
const sendPaymentRequest = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.paymentQr = req.file.path;
    booking.status = "contacted";
    await booking.save();

    // 📧 Send email to user
    await sendPaymentEmail(booking);

    res.json({
      success: true,
      message: "Payment request sent successfully",
    });
  } catch (error) {
    console.error("PAYMENT REQUEST ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send payment request",
    });
  }
};

/* ===============================
   EXPORTS
   =============================== */
module.exports = {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus,
  sendPaymentRequest,
};
