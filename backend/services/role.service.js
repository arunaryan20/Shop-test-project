const prisma = require("../config/db");

exports.getRoleById = async (roleId) => {
  return prisma.role.findUnique({
    where: { id: roleId },
  });
};