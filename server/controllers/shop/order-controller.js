const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

/* =========================
   CREATE ORDER (NO PAYPAL)
========================= */
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      orderDate,
      orderUpdateDate,
      cartId,
    } = req.body;

    // ✅ SAFETY CHECK
    if (!cartItems || !cartItems.length) {
      return res.status(400).json({
        success: false,
        message: "Cart items missing",
      });
    }

    /* ✅ SERVER-SIDE TOTAL CALCULATION (FIXED) */
    const totalAmount = cartItems.reduce((sum, item) => {
      return sum + Number(item.price) * Number(item.quantity);
    }, 0);

    /* ✅ CREATE ORDER (FIXED PRICE STORAGE) */
    const newlyCreatedOrder = new Order({
      userId,
      cartId,
      cartItems: cartItems.map((item) => ({
        productId: item.productId,
        title: item.title,
        image: item.image,
        price: Number(item.price), // ✅ ONLY TRUST PRICE
        quantity: item.quantity,
      })),
      addressInfo,
      orderStatus: orderStatus || "pending",
      paymentMethod: paymentMethod || "contact-admin",
      paymentStatus: paymentStatus || "pending",
      totalAmount,
      orderDate: orderDate || new Date(),
      orderUpdateDate: orderUpdateDate || new Date(),
    });

    await newlyCreatedOrder.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      orderId: newlyCreatedOrder._id,
      data: newlyCreatedOrder,
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Some error occurred while creating order",
    });
  }
};

/* =========================
   CONFIRM ORDER
========================= */
const confirmOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.orderStatus = "confirmed";
    order.paymentStatus = "confirmed";
    order.orderUpdateDate = new Date();

    /* ✅ UPDATE PRODUCT STOCK */
    for (let item of order.cartItems) {
      const product = await Product.findById(item.productId);
      if (!product) continue;

      product.totalStock -= item.quantity;
      await product.save();
    }

    /* ✅ CLEAR CART */
    if (order.cartId) {
      await Cart.findByIdAndDelete(order.cartId);
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (error) {
    console.error("CONFIRM ORDER ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

/* =========================
   USER ORDERS
========================= */
const getAllOrdersByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("GET USER ORDERS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

/* =========================
   ORDER DETAILS
========================= */
const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("ORDER DETAILS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    await Order.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete order",
    });
  }
};

module.exports = {
  createOrder,
  confirmOrder,
  getAllOrdersByUser,
  getOrderDetails,
};
