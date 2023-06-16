import * as yup from "yup";

export const ForgotPassSchema_ = yup.object().shape({
  email: yup
    .string()
    .email("Email không đúng định dạng")
    .required("Email không được để trống"),
});

export const schemaOTP = yup.object().shape({
  email: yup
    .string()
    .email("Email không đúng định dạng")
    .required("Email không được để trống"),
  otp: yup
    .string()
    .test("is-number", "Mã OTP phải là số", (value) =>
      /^\d+$/.test(value as any)
    ) // Kiểm tra chỉ chấp nhận số
    .max(4, "Mã OTP tối đa là 4 số")
    .required("Mã OTP không được để trống."),
});

export const resetPassword_ = yup.object().shape({
  email: yup
    .string()
    .email("Email không đúng định dạng")
    .required("Email không được để trống"),
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
});
