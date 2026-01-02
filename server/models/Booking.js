const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
      index: true,
    },

    userId: String,
    userName: String,
    email: String,
    phone: String,

    productId: String,
    productName: String,
    productImage: String,
    size: String,

    status: {
      type: String,
      enum: ["pending", "contacted", "confirmed", "cancelled"],
      default: "pending",
    },

    paymentQr: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// 🔥 AUTO-GENERATE BOOKING ID
BookingSchema.pre("save", function (next) {
  if (!this.bookingId) {
    this.bookingId =
      "BK-" +
      Date.now().toString().slice(-6) +
      Math.floor(100 + Math.random() * 900); // 3 random digits
  }
  next();
});

module.exports = mongoose.model("Booking", BookingSchema);
