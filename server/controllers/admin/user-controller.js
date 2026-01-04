const User = require("../../models/User");
const Order = require("../../models/Order");
const Address = require("../../models/Address"); // ✅ ADD

/**
 * GET ALL USERS (ADMIN) – WITH ADDRESS
 */
const getAllUsersForAdmin = async (req, res) => {
  try {
    // 1️⃣ Fetch all users (excluding password)
    const users = await User.find({ role: "user" })
      .select("-password")
      .lean();

    // 2️⃣ Attach latest address for each user
    const usersWithAddress = await Promise.all(
      users.map(async (user) => {
        const address = await Address.findOne({ userId: user._id })
          .sort({ createdAt: -1 })
          .lean();

        return {
          ...user,
          phone: address?.phone || "",
          address: address
            ? {
                address: address.address || "",
                city: address.city || "",
                pincode: address.pincode || "",
                notes: address.notes || "",
              }
            : null,
        };
      })
    );

    res.status(200).json({
      success: true,
      data: usersWithAddress,
    });
  } catch (e) {
    console.error("GET USERS ADMIN ERROR:", e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

/**
 * GET ALL ORDERS OF A SPECIFIC USER (ADMIN)
 */
const getOrdersByUserIdForAdmin = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.error("GET USER ORDERS ADMIN ERROR:", e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

/**
 * DELETE USER (ADMIN)
 */
const deleteUserForAdmin = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Safety: prevent deleting admin users
    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin users cannot be deleted",
      });
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (e) {
    console.error("DELETE USER ADMIN ERROR:", e);
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};

module.exports = {
  getAllUsersForAdmin,
  getOrdersByUserIdForAdmin,
  deleteUserForAdmin,
};
