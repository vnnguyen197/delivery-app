import React from "react";
import { Button, Input } from "antd";
import { UserOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import { ForgotPassSchema_ } from "validations/forgotPassSchema";
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

export const SendOpt = () => {
  const navigate = useNavigate();
  const { setLoadingTrue, setLoadingFalse } = useLoading();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPassSchema_,
    onSubmit: async (values) => {
      console.log("👋  values:", values);
      setLoadingTrue();
      setLoadingFalse();
      navigate("/reset-password");

      //   try {
      //     const { data } = await authAPI.login(values);
      //     setToken(data.accessToken);
      //     getProfile()
      //     setLoadingFalse();
      //     navigate("/");
      //   } catch (error: any) {
      //     setLoadingFalse();
      //   }
    },
  });

  return (
    <StyleForm onSubmit={formik.handleSubmit}>
      <StyleContainer>
        <StyleTitle>xác thực tài khoản</StyleTitle>
        <div>Mã OTP đã được gởi về  <strong>v.nnguyen0799@gmail.com</strong>, vui lòng kiểm tra email của bạn và nhập mã OTP </div>
        <StyleInput>
          <Input
            size="large"
            name="email"
            placeholder="Nhập mã OTP"
            prefix={<UserOutlined />}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <StyleError>{formik?.errors?.email}</StyleError>
        </StyleInput>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          style={{ width: "100%" }}
        >
         Xác thực OTP
        </Button>
        <StyleBack onClick={() => navigate("/reset-password")}>
          <ArrowLeftOutlined />
          Quay lại đăng nhập
        </StyleBack>
      </StyleContainer>
    </StyleForm>
  );
};
