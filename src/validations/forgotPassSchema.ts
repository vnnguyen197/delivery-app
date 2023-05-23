import * as yup from "yup";

export const ForgotPassSchema_ = yup.object().shape({
  email: yup
    .string()
    .email("Email không đúng định dạng")
    .required("Email không được để trống"),
});
