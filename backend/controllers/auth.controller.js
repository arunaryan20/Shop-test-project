const bcryptjs = require("bcryptjs");
const authValidation = require("../validations/auth.validation");
const prisma = require("../config/db");
const sendResponse = require("../utils/response").sendResponse;
const jwtUtils = require("../utils/jwt");
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const validatedData = authValidation.createUserValidation.parse(req.body);
    const checkExistingUser = await prisma.User.findUnique({
      where: {
        email: email,
      },
    });
    if (checkExistingUser) {
      return sendResponse(res, 400, null, "User already exists");
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await prisma.User.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
    return sendResponse(res, 201, user, "User created successfully");
  } catch (err) {
    return sendResponse(
      res,
      500,
      null,
      err?.issues[0]?.message || "Internal server error",
    );
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const validatedData = await authValidation.loginValidation.parse(req.body);
    const user = await prisma.User.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return sendResponse(res, 400, null, "User does not exist");
    }

    const match = await bcryptjs.compare(password, user.password);
    if (!match) {
      return sendResponse(res, 400, null, "Wrong password");
    }
    const payload = {
      id: user.id,
      email: user.email,
      shopId: user.shopId,
      roleId: user.roleId,
    };
    const accessToken = jwtUtils?.genereateAccessToken(payload);
    const refreshToken = jwtUtils?.generateRefereshToken(payload);
    const responseData = {
      user,
      accessToken,
      refreshToken,
    };
    return sendResponse(res, 200, responseData, "Login successful");
  } catch (err) {
    if (err?.issues?.length > 0) {
      return sendResponse(res, 400, null, err.issues[0].message);
    }
    return sendResponse(res, 500, null, "Internal server error");
  }
};

exports.electronLogin = async (req, res) => {
  try {
    const data = req.user;
    if (!data?.id) {
      return sendResponse(res, 400, null, "User not found");
    }
    const userData = await prisma.User.findUnique({
      where: {
        id: Number(data?.id),
      },
    });
    if (!userData) {
      return sendResponse(res, 400, null, "User not found");
    }
    return res.json({
      success: true,
      user: userData,
    });
  } catch (err) {
    return sendResponse(res, 500, null, "Internal server error");
  }
};

exports.createRole = async (req, res) => {
  try {
    const { name } = req.body;
    const validatedData = await authValidation.createRoleValidation.parse(
      req.body,
    );
    const result = await prisma.Role.findUnique({
      where: {
        name: name.toLowerCase(),
      },
    });
    if (result) {
      return sendResponse(res, 400, null, "Role already exists");
    }
    const createdRole = await prisma.Role.create({
      data: {
        name: name.toLowerCase(),
      },
    });
    return sendResponse(res, 201, createdRole, "Role created successfully");
  } catch (err) {
    return sendResponse(
      res,
      500,
      null,
      err?.issues[0]?.message || "Internal server error",
    );
  }
};

exports.getRoleList = async (req, res) => {
  try {
    const roles = await prisma.role.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return sendResponse(res, 200, roles, "Role fetched successfully");
  } catch (err) {
    return sendResponse(
      res,
      500,
      null,
      err?.issues[0]?.message || "Internal server error",
    );
  }
};
