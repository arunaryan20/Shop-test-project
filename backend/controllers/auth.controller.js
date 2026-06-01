const authService = require("../services/auth.service");

exports.register = async (req, res) => {
  try {
    const user = await authService.registerOwner(req.body);

    res.json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const data = await authService.login(req.body);

    res.json({
      success: true,
      ...data,
    });
  } catch (err) {
    console.log("Error--->", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.createRole = async (req, res) => {
 try {
    const result = await authService.createRole(req.body);

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