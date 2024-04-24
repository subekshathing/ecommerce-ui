import * as Yup from "yup";
export const registerValidationSchema = Yup.object({
  firstName: Yup.string()
    .required("first name is required")
    .trim()
    .max(30, "first name must be at most 30 character"),
  lastName: Yup.string()
    .required("last name is required")
    .trim()
    .max(30, "last name must be at most 30 character"),
  email: Yup.string()
    .email("email must be valid")
    .required("email is required")
    .trim()
    .max(65, "email must be at most 65 character")
    .lowercase(),
  password: Yup.string()
    .required("password is required")
    .trim()
    .min(6, "password must be at least 6 character")
    .max(20, "password must be at most 20 character"),
  role: Yup.string()
    .required("role is required")
    .trim()
    .oneOf(["seller", "buyer"], "role must be either seller or buyer"),

  gender: Yup.string().trim().oneOf(["male", "female", "preferNotToSay"]),
});
