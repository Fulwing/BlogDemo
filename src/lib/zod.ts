import { object, string } from "zod"

export const signInSchema = object({
  username: string({ required_error: "Username is required" })
    .min(1, "Username is required"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})

export const signUpSchema = signInSchema.extend({
  confirmPassword: string({ required_error: "Confirm password is required" })
    .min(1, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});
