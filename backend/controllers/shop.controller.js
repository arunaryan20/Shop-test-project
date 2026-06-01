const shopService = require("../services/shop.service");

exports.registerShop = async (req, res) => {
  try {
    const result = await shopService.registerShop(req.body);

    res.json({
      success: true,
      result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};