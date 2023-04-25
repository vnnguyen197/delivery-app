import { VALIDATE_STRING_PASSWORD } from "utils/regex";
import * as yup from "yup";

export const loginSchema_ = yup.object().shape({
  email: yup
    .string()
    .email("Email không đúng định dạng")
    .required("Email không được để trống"),
  password: yup
    .string()
    .required("Mật khẩu không được để trống")
    .min(
      8,
      "Mật khẩu tối thiểu 8 ký tự, ít nhất có 1 ký tự viết hoa, 1 ký tự số và một ký tự đặc biệt"
    )

    .matches(
      VALIDATE_STRING_PASSWORD,
      "Mật khẩu tối thiểu 8 ký tự, ít nhất có 1 ký tự viết hoa, 1 ký tự số và một ký tự đặc biệt"
    ),
});
