const { z } = require("zod");

exports.createUserValidation = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name cannot exceed 100 characters"),

  email: z.string().email("Invalid email address"),

  password: z.string().min(6, "Password must be at least 6 characters")
});

exports.loginValidation = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

exports.createRoleValidation = z.object({
  name: z
    .string()
    .min(2, "Role name is required")
    .regex(
      /^[A-Za-z]+$/,
      "Role name can only contain letters. Numbers, spaces, and special characters are not allowed."
    ),
});
