import { VALIDATE_STRING_VN } from "utils/regex";
import * as yup from "yup";

export const addOrderSchema_ = yup.object().shape({
  name: yup.string().required("Tên gói hàng không được để trống"),
  productVolume: yup.string().required("Khối lượng không được để trống"),
  description: yup.string().required("Chi tiết gói hàng không được để trống"),
  senderName: yup
    .string()
    .required("Họ và tên không được để trống")
    .max(50, "Họ và tên tối đa là 50 ký tự")
    .min(3, "Họ và tên tối thiểu là 3 ký tự")
    .matches(
      VALIDATE_STRING_VN,
      "Họ và tên bao gồm chữ, space tối thiểu 3 ký tự, tối đa 50 ký tự"
    ),
  senderPhone: yup
    .string()
    .required("Số điện thoại người gởi không được để trống")
    .matches(/(84|0[1|2|3|5|7|8|9])+([0-9]{8})\b/, {
      message: "Số điện thoại không hợp lệ",
      excludeEmptyString: true,
    })
    .max(10, "Số điện thoại tối đa là 10 số"),
  senderAddress: yup.string().required("Địa chỉ người gởi không được để trống"),
  receiverName: yup
    .string()
    .required("Họ và tên không được để trống")
    .max(50, "Họ và tên tối đa là 50 ký tự")
    .min(3, "Họ và tên tối thiểu là 3 ký tự")
    .matches(
      VALIDATE_STRING_VN,
      "Họ và tên bao gồm chữ, space tối thiểu 3 ký tự, tối đa 50 ký tự"
    ),
  receiverPhone: yup
    .string()
    .required("Số điện thoại người nhận không được để trống")
    .matches(/(84|0[1|2|3|5|7|8|9])+([0-9]{8})\b/, {
      message: "Số điện thoại không hợp lệ",
      excludeEmptyString: true,
    })
    .max(10, "Số điện thoại tối đa là 10 số"),
  receiverAddress: yup
    .string()
    .required("Địa chỉ người nhận không được để trống"),
});
