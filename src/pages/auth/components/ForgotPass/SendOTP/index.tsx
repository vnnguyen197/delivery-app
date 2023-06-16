import React, { useState } from "react";
import { Button, Input } from "antd";
import { UserOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import { schemaOTP } from "validations/forgotPassSchema";
import { useLoading } from "contexts/LoadingContext";
import { useNavigate } from "react-router-dom";
import { StyleError } from "styles/styleCommon";
import {
  StyleBack,
  StyleContainer,
  StyleForm,
  StyleInput,
  StyleTitle,
} from "./style";
import authAPI from "services/authAPI";

export const SendOTP = () => {
  const navigate = useNavigate();
  const { setLoadingTrue, setLoadingFalse } = useLoading();
  const [error, setError] = useState("")

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    validationSchema: schemaOTP,
    onSubmit: async (values) => {
      setLoadingTrue();
      try {
        await authAPI.verifyOTP(values);
        setLoadingFalse();
        navigate("/reset-password");
      } catch (error: any) {
        setLoadingFalse();
        setError("Mã OTP đã hết hạn")
      }
    },
  });

  return (
    <StyleForm onSubmit={formik.handleSubmit}>
      <StyleContainer>
        <StyleTitle>xác thực tài khoản</StyleTitle>
        <div>
          Mã OTP đã được gởi về <strong>EMAIL của bạn</strong>, vui
          lòng kiểm tra email của bạn và nhập mã OTP{" "}
        </div>
        <StyleInput>
          <Input
            size="large"
            name="email"
            placeholder="Nhập emai của bạn"
            prefix={<UserOutlined />}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <StyleError>{formik?.errors?.email}</StyleError>
        </StyleInput>
        <StyleInput>
          <Input
            size="large"
            name="otp"
            placeholder="Nhập mã OTP"
            prefix={<UserOutlined />}
            onChange={formik.handleChange}
            value={formik.values.otp}
          />
          <StyleError>{formik?.errors?.otp || error}</StyleError>
        </StyleInput>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          style={{ width: "100%" }}
        >
          Xác thực OTP
        </Button>
        <StyleBack onClick={() => navigate("/login")}>
          <ArrowLeftOutlined />
          Quay lại đăng nhập
        </StyleBack>
      </StyleContainer>
    </StyleForm>
  );
};
