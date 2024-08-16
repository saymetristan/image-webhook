const openaiService = require('../services/openaiService');

const processImage = async (req, res) => {
  try {
    const imageUrl = req.body.imageUrl;
    const result = await openaiService.processImage(imageUrl);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  processImage,
};