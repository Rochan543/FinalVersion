const User = require("../../models/User");

/* ADD / REMOVE FAVORITE */
const toggleFavorite = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false });
    }

    const isFav = user.favorites.includes(productId);

    if (isFav) {
      user.favorites = user.favorites.filter(
        (id) => id.toString() !== productId
      );
    } else {
      user.favorites.push(productId);
    }

    await user.save();

    res.json({
      success: true,
      data: user.favorites,
    });
  } catch (e) {
    res.status(500).json({ success: false });
  }
};

/* GET FAVORITES */
const getFavorites = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("favorites");

    res.json({
      success: true,
      data: user.favorites,
    });
  } catch (e) {
    res.status(500).json({ success: false });
  }
};

module.exports = {
  toggleFavorite,
  getFavorites,
};
