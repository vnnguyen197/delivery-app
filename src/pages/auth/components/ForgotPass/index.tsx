import React from "react";
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

export const ForgotPass = () => {
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
      navigate("/send-otp");
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
        <div>
          <StyleTitle>Bạn quên mật khẩu?</StyleTitle>
          <span style={{fontSize: "10px"}}>Nhập email của bạn để tiến hành lấy lại mật khẩu</span>
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
