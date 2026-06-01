const bcryptjs = require("bcryptjs");

const repo = require("../repositories/auth.repository");
const genereateAccessToken = require("../utils/jwt");
const generateRefereshToken = require("../utils/jwt");

exports.registerOwner = async (data) => {
  const existing = await repo.findByEmail(data.email);
  if (existing) {
    throw new Error("Email already exist");
  }
  const hashedPassword = await bcryptjs.hash(data.password, 10);
  return repo.createUser({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    roleId: data.roleId,
    shopId: data.shopId,
  });
};

exports.login = async ({ email, password }) => {
  const user = await repo.findByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const match = await bcryptjs.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const payload = {
    id: user.id,
    email: user.email,
    shopId: user.shopId,
    roleId: user.roleId,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return { user, accessToken, refreshToken };
};
