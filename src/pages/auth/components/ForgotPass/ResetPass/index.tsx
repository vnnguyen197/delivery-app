import React, { useState } from "react";
import { Button, Input } from "antd";
import { UserOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import { resetPassword_ } from "validations/forgotPassSchema";
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

export const ResetPass = () => {
  const navigate = useNavigate();
  const { setLoadingTrue, setLoadingFalse } = useLoading();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: resetPassword_,
    onSubmit: async (values) => {
      const { confirmPassword, ...newValues } = values; // create a new object without the confirmPassword property
      setLoadingTrue();
      try {
        await authAPI.changePassword(newValues);
        setLoadingFalse();
        navigate("/login");
      } catch (error: any) {
        setLoadingFalse();
        setError("Đổi mật khẩu không thành công");
      }
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
            placeholder="Email"
            prefix={<UserOutlined />}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <StyleError>{formik?.errors?.email}</StyleError>
        </StyleInput>
        <StyleInput>
          <Input
            size="large"
            name="password"
            placeholder="Nhập mật khẩu mới"
            prefix={<UserOutlined />}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <StyleError>{formik?.errors?.password}</StyleError>
        </StyleInput>
        <StyleInput>
          <Input
            size="large"
            name="confirmPassword"
            placeholder="Nhập lại mật khẩu mới"
            prefix={<UserOutlined />}
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
          <StyleError>{formik?.errors?.confirmPassword || error}</StyleError>
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
