const Announcement = require("../../models/Announcement");

// ADD ANNOUNCEMENT
const addAnnouncement = async (req, res) => {
  try {
    const { title, image } = req.body;

    // deactivate old announcements
    await Announcement.updateMany({}, { isActive: false });

    const announcement = new Announcement({ title, image });
    await announcement.save();

    res.json({ success: true, data: announcement });
  } catch (e) {
    res.status(500).json({ success: false });
  }
};

// GET ACTIVE ANNOUNCEMENT
const getActiveAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findOne({ isActive: true });
    res.json({ success: true, data: announcement });
  } catch (e) {
    res.status(500).json({ success: false });
  }
};

module.exports = {
  addAnnouncement,
  getActiveAnnouncement,
};
