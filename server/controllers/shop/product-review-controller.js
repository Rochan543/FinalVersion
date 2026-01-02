const Order = require("../../models/Order");
const ProductReview = require("../../models/Review");

const addProductReview = async (req, res) => {
  try {
    const {
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    } = req.body;

    // ✅ FIXED ORDER CHECK
    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: { $in: ["confirmed", "delivered"] },
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You need to purchase this product to review it.",
      });
    }

    const existingReview = await ProductReview.findOne({
      productId,
      userId,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this product.",
      });
    }

    const newReview = new ProductReview({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
      status: "pending", // ✅ moderation
    });

    await newReview.save();

    res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await ProductReview.find({
      productId,
      status: "approved",
    });

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching reviews",
    });
  }
};

module.exports = {
  addProductReview,
  getProductReviews,
};
