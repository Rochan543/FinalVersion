const express = require("express");
const {
  addSubscriber,
  getSubscribers,
} = require("../../controllers/admin/subscriber-controller");

const router = express.Router();

router.post("/add", addSubscriber);
router.get("/list", getSubscribers);
router.delete("/:id", async (req, res) => {
  try {
    await require("../../models/Subscriber").findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});


module.exports = router;
