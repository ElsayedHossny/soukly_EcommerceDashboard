import * as z from "zod";


export const formSchema = z
  .object({
    name: z
      .string()
      .min(3, "Auth.errors.nameMin")
      .max(32, "Auth.errors.nameMax")
      .regex(/^[A-Za-z\s]+$/, "Auth.errors.nameFormat"),

    email: z
      .string()
      .email("Auth.errors.emailInvalid")
      .min(5, "Auth.errors.emailMin")
      .max(100, "Auth.errors.emailMax"),

    password: z
      .string()
      .min(8, "Auth.errors.passwordMin")
      .max(100, "Auth.errors.passwordMax")
      .regex(/[A-Z]/, "Auth.errors.passwordUppercase")
      .regex(/[a-z]/, "Auth.errors.passwordLowercase")
      .regex(/[0-9]/, "Auth.errors.passwordNumber"),

    rePassword: z
      .string()
      .min(8, "Auth.errors.rePasswordMin")
      .max(100, "Auth.errors.rePasswordMax"),

    phone: z
      .string()
      .min(10, "Auth.errors.phoneMin")
      .max(15, "Auth.errors.phoneMax")
      .regex(/^\+?[0-9]+$/, "Auth.errors.phoneFormat"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Auth.errors.passwordMismatch",
    path: ["rePassword"],
  });