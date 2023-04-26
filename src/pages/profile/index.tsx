import React from "react";
import {
  StyleAvatar,
  StyleButton,
  StyleContainer,
  StyleDes,
  StyleInfo,
  StyleInput,
  StyleItemLeft,
  StyleItemRight,
  StyleListLeft,
  StyleListRight,
  StyleProfile,
  StyleRuleUser,
  StyleTitle,
  StyleTitleUser,
} from "./style";
import { Avatar, DatePicker, Input } from "antd";
import { useFormik } from "formik";
import { editProfileSchema_ } from "validations/profileSchema";
import type { DatePickerProps } from "antd";
import { StyleError } from "styles/styleCommon";

const Profile = () => {
  const imgUser =
    "https://scontent.fdad2-1.fna.fbcdn.net/v/t39.30808-1/340536787_719219749989277_7503381357964002337_n.jpg?stp=dst-jpg_p200x200&_nc_cat=108&ccb=1-7&_nc_sid=7206a8&_nc_ohc=yGxo3Uv0MLcAX8ZKaVe&_nc_ht=scontent.fdad2-1.fna&oh=00_AfAmddtxYjCTyH3aE56yb6VC0986kXY8X2f8d4k-h_kW6Q&oe=644D5AD2";

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      citizenId: "",
      dateCitizen: "",
      addressCitizen: "",
      address: "",
      dateOfBirth: "",
    },
    validationSchema: editProfileSchema_,
    onSubmit: (values) => {
      console.log("👋  values:", values);
    },
  });
  console.log(formik.errors, "formik.errors");

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <StyleContainer onSubmit={formik.handleSubmit}>
      <StyleInfo>
        <StyleTitle>Thông tin cá nhân</StyleTitle>
        <StyleDes>Quản lý thông tin hồ sơ để bảo mật tài khoản</StyleDes>
      </StyleInfo>
      <StyleProfile>
        <StyleListLeft>
          <StyleAvatar>
            <Avatar src={imgUser} style={{ width: 120, height: 120 }} />
          </StyleAvatar>
          <StyleTitleUser>Nguyen Van Nguyen</StyleTitleUser>
          <StyleRuleUser>Rule : Shipper</StyleRuleUser>
        </StyleListLeft>
        <StyleListRight>
          <StyleItemRight>
            <StyleInput>
              <Input
                size="large"
                name="fullName"
                placeholder="Tên đăng nhập"
                onChange={formik.handleChange}
                value={formik.values.fullName}
              />
              {formik.errors.fullName && (
                <StyleError>{formik?.errors?.fullName}</StyleError>
              )}
            </StyleInput>
            <StyleInput>
              <Input
                size="large"
                name="phoneNumber"
                placeholder="Số điện thoại"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
              />
              {formik.errors.phoneNumber && (
                <StyleError>{formik?.errors?.phoneNumber}</StyleError>
              )}
            </StyleInput>
            <StyleInput>
              <Input
                size="large"
                name="email"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik?.errors?.email && (
                <StyleError>{formik?.errors?.email}</StyleError>
              )}
            </StyleInput>
            <StyleInput>
              <DatePicker
                size="large"
                name="dateOfBirth"
                placeholder="Ngày sinh"
                onChange={onChange}
              />
              {formik?.errors?.dateOfBirth && (
                <StyleError>{formik?.errors?.dateOfBirth}</StyleError>
              )}
            </StyleInput>
          </StyleItemRight>
          <StyleItemLeft>
            <StyleInput>
              <Input
                size="large"
                name="citizenId"
                placeholder="CCCD/CMND"
                onChange={formik.handleChange}
                value={formik.values.citizenId}
              />
              {formik?.errors?.citizenId && (
                <StyleError>{formik?.errors?.citizenId}</StyleError>
              )}
            </StyleInput>
            <StyleInput>
              <Input
                size="large"
                name="addressCitizen"
                placeholder="Nơi cấp"
                onChange={formik.handleChange}
                value={formik.values.addressCitizen}
              />
              {formik?.errors?.addressCitizen && (
                <StyleError>{formik?.errors?.addressCitizen}</StyleError>
              )}
            </StyleInput>
            <StyleInput>
              <DatePicker
                size="large"
                name="dateCitizen"
                placeholder="Ngày cấp"
                onChange={onChange}
              />
              {formik?.errors?.dateCitizen && (
                <StyleError>{formik?.errors?.dateCitizen}</StyleError>
              )}
            </StyleInput>
            <StyleInput>
              <Input
                size="large"
                name="address"
                placeholder="Địa chỉ"
                onChange={formik.handleChange}
                value={formik.values.address}
              />
              {formik?.errors?.address && (
                <StyleError>{formik?.errors?.address}</StyleError>
              )}
            </StyleInput>
          </StyleItemLeft>
        </StyleListRight>
      </StyleProfile>
      <StyleButton type="submit">Lưu thay đổi</StyleButton>
    </StyleContainer>
  );
};

export default Profile;
