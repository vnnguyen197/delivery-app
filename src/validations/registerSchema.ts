import { VALIDATE_STRING_VN } from "utils/regex";
import * as yup from "yup";

export const registerSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Họ và tên không được để trống")
    .max(50, "Họ và tên tối đa là 50 ký tự")
    .min(3, "Họ và tên tối thiểu là 3 ký tự")
    .matches(
      VALIDATE_STRING_VN,
      "Họ và tên bao gồm chữ, space tối thiểu 3 ký tự, tối đa 50 ký tự"
    ),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email không được để trống")
    .max(40, "Email tối đa 40 ký tự")
    .min(8, "Email tối thiểu 8 ký tự")
    .matches(/^[\w.]+@([\w]+\.)+[\w]{2,4}$/g, "Email không hợp lệ"),
  phoneNumber: yup
    .string()
    .matches(/(84|0[1|2|3|5|7|8|9])+([0-9]{8})\b/, {
      message: "Số điện thoại không hợp lệ",
      excludeEmptyString: true,
    })
    .max(10, "Số điện thoại tối đa là 10 số"),
  password: yup
    .string()
    .required("Mật khẩu không được để trống")
    .min(
      8,
      "Mật khẩu tối thiểu 1 chữ hoa, 1 chữ thường, 1 ký tự đặc biệt, min là 8, max là 20 ký tự"
    )
    .max(
      20,
      "Mật khẩu tối thiểu 1 chữ hoa, 1 chữ thường, 1 ký tự đặc biệt, min là 8, max là 20 ký tự"
    )
    .matches(
      /^(?!.* )(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z]).{8,20}$/,
      "Mật khẩu tối thiểu 1 chữ hoa, 1 chữ thường, 1 ký tự đặc biệt, min là 8, max là 20 ký tự"
    ),
  confirmPassword: yup
    .string()
    .required("Xác nhận mật khẩu không được để trống")
    .oneOf([yup.ref("password"), ""], "Mật khẩu không khớp"),
  address: yup.string().required("Địa chỉ không được để trống"),
});
