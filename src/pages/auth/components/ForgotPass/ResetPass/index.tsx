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

export const ResetPass = () => {
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
        <StyleTitle>Cập nhật lại mật khẩu</StyleTitle>
        <StyleInput>
          <Input
            size="large"
            name="email"
            placeholder="Nhập mật khẩu mới"
            prefix={<UserOutlined />}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <StyleError>{formik?.errors?.email}</StyleError>
        </StyleInput>
        <StyleInput>
          <Input
            size="large"
            name="email"
            placeholder="Nhập lại mật khẩu mới"
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
         Cập nhật mật khẩu
        </Button>
        <StyleBack onClick={() => navigate("/login")}>
          <ArrowLeftOutlined />
          Quay lại đăng nhập
        </StyleBack>
      </StyleContainer>
    </StyleForm>
  );
};
