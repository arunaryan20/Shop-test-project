const repo = require("../repositories/shop.repository");

exports.registerShop = async (data) => {
  return repo.registerShop({
    name: data?.name,
    email: data?.email,
    phone: data?.phone,
    address: data?.address,
  });
};
