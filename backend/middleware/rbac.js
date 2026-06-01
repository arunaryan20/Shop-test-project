const roleService = require("../services/role.service");

const rbac = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const role = await roleService.getRoleById(req.user.roleId);

      if (!role) {
        return res.status(403).json({ message: "Role not found" });
      }

      if (!allowedRoles.includes(role.name)) {
        return res.status(403).json({ message: "Access denied" });
      }

      req.role = role;
      next();
    } catch (err) {
      return res.status(500).json({ message: "RBAC error" });
    }
  };
};

module.exports = rbac;