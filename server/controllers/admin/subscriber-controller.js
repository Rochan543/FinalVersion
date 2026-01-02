const Subscriber = require("../../models/Subscriber");

// ADD SUBSCRIBER
exports.addSubscriber = async (req, res) => {
  try {
    const { email } = req.body;

    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return res.json({ success: true });
    }

    const subscriber = new Subscriber({ email });
    await subscriber.save();

    res.json({ success: true, data: subscriber });
  } catch (e) {
    res.status(500).json({ success: false });
  }
};

// GET ALL SUBSCRIBERS (ADMIN)
exports.getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json({ success: true, data: subscribers });
  } catch (e) {
    res.status(500).json({ success: false });
  }
};
