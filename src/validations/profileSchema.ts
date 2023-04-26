import { VALIDATE_STRING_CITIZEN_ID, VALIDATE_STRING_VN } from "utils/regex";
import * as yup from "yup";

export const editProfileSchema_ = yup.object().shape({
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
  citizenId: yup
    .string()
    .min(9, "Chứng minh nhân dân bao gồm 9 số")
    .max(12, "Căn cước công dân bao gồm 12 số")
    .matches(
      VALIDATE_STRING_CITIZEN_ID,
      "Căn cước công dân hoặc chứng minh nhân dân không hợp lệ"
    ),
  dateCitizen: yup
    .string()
    // .test(
    //   "registrationDate",
    //   "Ngày cấp phải nhỏ hơn hoặc bằng ngày hiện tại",
    //   function (value: any) {
    //     return new Date(value) <= new Date();
    //   }
    // )
    ,

  addressCitizen: yup.string(),
  address: yup.string(),
  dateOfBirth: yup.string(),
});
