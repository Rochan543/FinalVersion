const Feature = require("../../models/Feature");

const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    console.log(image, "image");

    const featureImages = new Feature({
      image,
    });

    await featureImages.save();

    res.status(201).json({
      success: true,
      data: featureImages,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.find({});

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

/* ===================== 🔴 ADDED CODE START ===================== */

const deleteFeatureImage = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Feature.findById(id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Feature image not found",
      });
    }

    await Feature.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      data: { _id: id },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Failed to delete feature image",
    });
  }
};

/* ===================== 🔴 ADDED CODE END ===================== */

module.exports = {
  addFeatureImage,
  getFeatureImages,
  deleteFeatureImage, // 🔴 ADDED
};
