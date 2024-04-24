import * as Yup from "yup";
export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .required()
    .trim()
    .email("must be a valid email address")
    .lowercase(),
  password: Yup.string().required("password is required"),
});
