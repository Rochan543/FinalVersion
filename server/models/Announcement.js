const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema({
  title: String,
  image: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Announcement", AnnouncementSchema);
