import React from "react";
import { Button } from "antd";
import {
  StyleContainer,
  StyleTitle,
  StyleForm,
  Question,
  Option,
  LinkAuth,
} from "./style";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import * as Yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";

const Login = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values, "values");
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <StyleForm onSubmit={handleSubmit}>
          <StyleContainer>
            <StyleTitle>Đăng nhập</StyleTitle>
            <Input
              size="large"
              name="email"
              placeholder="Nhập emai của bạn"
              prefix={<UserOutlined />}
            />
            <ErrorMessage name="email" />
            <Input.Password
              size="large"
              name="password"
              placeholder="Nhập mật khẩu của bạn"
              prefix={<LockOutlined />}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
            <ErrorMessage name="password" />
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              disabled={isSubmitting}
            >
              Đăng nhập
              <Question>
                <Option>Bạn không có tài khoản?</Option>
                <LinkAuth>Đăng ký</LinkAuth>
              </Question>
            </Button>
          </StyleContainer>
        </StyleForm>
      )}
    </Formik>
  );
};

export default Login;
