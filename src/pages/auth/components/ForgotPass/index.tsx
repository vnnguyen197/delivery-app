import React, { useState } from "react";
import {
  StyleBack,
  StyleContainer,
  StyleForm,
  StyleInput,
  StyleTitle,
} from "./style";
import { Button, Input } from "antd";
import { UserOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import { ForgotPassSchema_ } from "validations/forgotPassSchema";
import { useLoading } from "contexts/LoadingContext";
import { useNavigate } from "react-router-dom";
import { StyleError } from "styles/styleCommon";
import authAPI from "services/authAPI";

export const ForgotPass = () => {
  const navigate = useNavigate();
  const { setLoadingTrue, setLoadingFalse } = useLoading();
  const [error, setError] = useState("")

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPassSchema_,
    onSubmit: async (values) => {
      setLoadingTrue();
      try {
        await authAPI.sendOTP(values);
        setLoadingFalse();
        navigate("/send-otp");
      } catch (error: any) {
        setLoadingFalse();
        setError("Email của bạn không tồn tại")
      }
    },
  });

  return (
    <StyleForm onSubmit={formik.handleSubmit}>
      <StyleContainer>
        <div>
          <StyleTitle>Bạn quên mật khẩu?</StyleTitle>
          <span style={{ fontSize: "10px" }}>
            Nhập email của bạn để tiến hành lấy lại mật khẩu
          </span>
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
          <StyleError>{formik?.errors?.email || error}</StyleError>
        </StyleInput>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          style={{ width: "100%" }}
        >
          Gửi OTP
        </Button>
        <StyleBack onClick={() => navigate("/login")}>
          <ArrowLeftOutlined />
          Quay lại đăng nhập
        </StyleBack>
      </StyleContainer>
    </StyleForm>
  );
};
