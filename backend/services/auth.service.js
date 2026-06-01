const bcryptjs = require("bcryptjs");

const repo = require("../repositories/auth.repository");
const jwtUtils = require("../utils/jwt");

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
    roleId: Number(data.roleId),
    shopId: Number(data.shopId),
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

  const accessToken = jwtUtils?.genereateAccessToken(payload);
  const refreshToken = jwtUtils?.generateRefereshToken(payload);

  return { user, accessToken, refreshToken };
};

exports.createRole = async (data) => {
  const existingRole = await repo.findByEmail(data.name);
  if (existingRole) {
    throw new Error("This role already exists");
  }
  return repo.createRole({
    name: data.name
  });
};