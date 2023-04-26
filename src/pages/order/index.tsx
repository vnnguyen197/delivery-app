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
  StyleInfoUser,
} from "./style";
import { Avatar, DatePicker, Input } from "antd";
import { useFormik } from "formik";
import { editProfileSchema_ } from "validations/profileSchema";
import type { DatePickerProps } from "antd";
import { StyleError } from "styles/styleCommon";
import { addOrderSchema_ } from "validations/orderSchema";

const Order = () => {
  const imgUser =
    "https://scontent.fdad2-1.fna.fbcdn.net/v/t39.30808-1/340536787_719219749989277_7503381357964002337_n.jpg?stp=dst-jpg_p200x200&_nc_cat=108&ccb=1-7&_nc_sid=7206a8&_nc_ohc=yGxo3Uv0MLcAX8ZKaVe&_nc_ht=scontent.fdad2-1.fna&oh=00_AfAmddtxYjCTyH3aE56yb6VC0986kXY8X2f8d4k-h_kW6Q&oe=644D5AD2";

  const formik = useFormik({
    initialValues: {
      nameOrder: "",
      massOrder: "",
      detailsOrder: "",
      sender: "",
      phoneSender: "",
      addressSender: "",
      receiver: "",
      phoneReceiver: "",
      addressReceiver: "",
    },
    validationSchema: addOrderSchema_,
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
        <StyleTitle>Đăng ký gởi hàng</StyleTitle>
        <StyleDes>
          Đăng ký gởi hàng liên quan đến các thông tin của đơn hàng
        </StyleDes>
      </StyleInfo>
      <StyleProfile>
        <StyleInput style={{ width: "50%" }}>
          <Input
            size="large"
            name="nameOrder"
            placeholder="Tên gói đơn"
            onChange={formik.handleChange}
            value={formik.values.nameOrder}
          />
          {formik.errors.nameOrder && (
            <StyleError>{formik?.errors?.nameOrder}</StyleError>
          )}
        </StyleInput>
        <StyleInput style={{ width: "50%" }}>
          <Input
            size="large"
            name="massOrder"
            placeholder="Khối lượng (gam)"
            onChange={formik.handleChange}
            value={formik.values.massOrder}
          />
          {formik.errors.massOrder && (
            <StyleError>{formik?.errors?.massOrder}</StyleError>
          )}
        </StyleInput>
        <StyleInput style={{ width: "50%" }}>
          <Input
            size="large"
            name="detailsOrder"
            placeholder="Chi tiết gói hàng"
            onChange={formik.handleChange}
            value={formik.values.detailsOrder}
          />
          {formik.errors.detailsOrder && (
            <StyleError>{formik?.errors?.detailsOrder}</StyleError>
          )}
        </StyleInput>
        <StyleListRight>
          <StyleInput>
            <StyleInfoUser>Thông tin người gởi</StyleInfoUser>
            <Input
              size="large"
              name="sender"
              placeholder="Họ và tên người gởi"
              onChange={formik.handleChange}
              value={formik.values.sender}
            />
            {formik.errors.sender && (
              <StyleError>{formik?.errors?.sender}</StyleError>
            )}
          </StyleInput>
          <StyleInput>
            <Input
              size="large"
              name="phoneSender"
              placeholder="Số điện thoại"
              onChange={formik.handleChange}
              value={formik.values.phoneSender}
            />
            {formik.errors.phoneSender && (
              <StyleError>{formik?.errors?.phoneSender}</StyleError>
            )}
          </StyleInput>
          <StyleInput>
            <Input
              size="large"
              name="addressSender"
              placeholder="Địa chỉ"
              onChange={formik.handleChange}
              value={formik.values.addressSender}
            />
            {formik?.errors?.addressSender && (
              <StyleError>{formik?.errors?.addressSender}</StyleError>
            )}
          </StyleInput>
        </StyleListRight>
        <StyleListLeft>
          <StyleInput>
            <StyleInfoUser>Thông tin người nhận</StyleInfoUser>
            <Input
              size="large"
              name="receiver"
              placeholder="Họ và tên người nhận"
              onChange={formik.handleChange}
              value={formik.values.receiver}
            />
            {formik.errors.receiver && (
              <StyleError>{formik?.errors?.receiver}</StyleError>
            )}
          </StyleInput>
          <StyleInput>
            <Input
              size="large"
              name="phoneNumber"
              placeholder="Số điện thoại"
              onChange={formik.handleChange}
              value={formik.values.phoneReceiver}
            />
            {formik.errors.phoneReceiver && (
              <StyleError>{formik?.errors?.phoneReceiver}</StyleError>
            )}
          </StyleInput>
          <StyleInput>
            <Input
              size="large"
              name="address"
              placeholder="Địa chỉ"
              onChange={formik.handleChange}
              value={formik.values.addressReceiver}
            />
            {formik?.errors?.addressReceiver && (
              <StyleError>{formik?.errors?.addressReceiver}</StyleError>
            )}
          </StyleInput>
        </StyleListLeft>
      </StyleProfile>
      <StyleButton type="submit">Tạo đơn</StyleButton>
    </StyleContainer>
  );
};

export default Order;
