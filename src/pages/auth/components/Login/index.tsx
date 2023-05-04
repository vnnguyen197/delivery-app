import React, { useEffect } from "react";
import { Button } from "antd";
import {
  StyleContainer,
  StyleTitle,
  StyleInput,
  StyleForm,
  Question,
  Option,
  LinkAuth,
} from "./style";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useFormik } from "formik";
import { loginSchema_ } from "validations/loginSchema";
import { StyleError } from "styles/styleCommon";
import { useNavigate } from "react-router-dom";
import { useLoading } from "contexts/LoadingContext";
import authAPI from "services/authAPI";
import useToken from "hooks/useToken";

const Login = ({ setToken }: { setToken: (accessToken: string) => void }) => {
  const navigate = useNavigate();
  const { setLoadingTrue, setLoadingFalse } = useLoading();
  const { token } = useToken();

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: loginSchema_,
    onSubmit: async (values) => {
      setLoadingTrue();
      try {
        const { data } = await authAPI.login(values);
        setToken(data.accessToken);
        setLoadingFalse();
        navigate("/");
      } catch (error: any) {
        setLoadingFalse();
      }
    },
  });

  const handleRegister = () => {
    setLoadingTrue();
    navigate("/register");
    setLoadingFalse();
  };

  useEffect(() => {
    if (token) {
      setLoadingTrue();
      navigate("/");
      setLoadingFalse();
    }
  }, []);

  return (
    <StyleForm onSubmit={formik.handleSubmit}>
      <StyleContainer>
        <StyleTitle>Đăng nhập</StyleTitle>
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
          <Input.Password
            size="large"
            name="password"
            placeholder="Nhập mật khẩu của bạn"
            prefix={<LockOutlined />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <StyleError>{formik?.errors?.password}</StyleError>
        </StyleInput>
        <div>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{ width: "100%" }}
          >
            Đăng nhập
          </Button>
          <Question>
            <Option>Bạn không có tài khoản?</Option>
            <LinkAuth onClick={handleRegister}>Đăng ký</LinkAuth>
          </Question>
        </div>
      </StyleContainer>
    </StyleForm>
  );
};

export default Login;
