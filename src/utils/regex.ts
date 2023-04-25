export const VALIDATE_STRING_VN =
  /^(?!\s)([a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ ,]+)$/g

export const VALIDATE_STRING_PASSWORD =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/

export const VALIDATE_STRING_PHONE = /(84|0[1|2|3|5|7|8|9])+([0-9]{8})\b/

export const VALIDATE_STRING_CITIZEN_ID = /^\d{12}$|^[0-9]{9}$/
// export const VALIDATE_DATE =
//   /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/
export const VALIDATE_DATE = /^\d{1,2}\/\d{1,2}\/\d{4}$/
export const VALIDATE_POSITIVE_INTEGER = /^(?!0)[0-9]{1,}$/g
export const VALIDATE_NUMBER = /^\d+(\.\d+)?$/

export const VALIDATE_PERCENT = /^(\d{1,2}(\.\d{1,2})?|100(\.0{1,2})?)$/;