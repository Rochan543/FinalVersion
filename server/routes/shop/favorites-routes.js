const express = require("express");
const {
  toggleFavorite,
  getFavorites,
} = require("../../controllers/shop/favorites-controller");

const router = express.Router();

router.post("/toggle", toggleFavorite);
router.get("/:userId", getFavorites);

module.exports = router;
