const sendResponse = require("../utils/response").sendResponse;
const prisma = require("../config/db");
const shopValidation = require("../validations/shop.validation");

exports.registerShop = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const validatedData = await shopValidation.createShopValidation.parse(
      req.body,
    );
    const result = await prisma.Shop.findUnique({
      where: {
        email: email,
      },
    });
    if (result) {
      return sendResponse(res, 400, null, "Email already exists");
    }
    const createdShop = await prisma.Shop.create({
      data: {
        name: name,
        email: email,
        phone: phone,
        address: address,
      },
    });
    return sendResponse(res, 201, createdShop, "Shop created successfully");
  } catch (err) {
    return sendResponse(
      res,
      500,
      null,
      err?.issues[0]?.message || "Internal server error",
    );
  }
};
