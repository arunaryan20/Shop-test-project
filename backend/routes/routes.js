const express = require("express");
const authController = require("../controllers/auth.controller");
const shopController=require("../controllers/shop.controller");
const auth = require("../middleware/auth");
const rbac = require("../middleware/rbac");

const router = express.Router();

// Owner routes

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

// Role routes
router.post("/auth/create-role", authController.createRole);

//Shop routes
router.post("/shop/register", shopController.registerShop);

// Product routes

// router.post("/product", auth, rbac(["Owner", "Manager"]), (req, res) => {
//   res.json({ message: "Product created" });
// });

// // Only Owner
// router.delete("/product/:id", auth, rbac(["Owner"]), (req, res) => {
//   res.json({ message: "Product deleted" });
// });

module.exports = router;
