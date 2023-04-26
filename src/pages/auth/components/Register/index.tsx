import React, { useState } from "react";
import { Button, Select } from "antd";
import {
  StyleContainer,
  StyleTitle,
  StyleInput,
  StyleForm,
  StyleRule,
} from "./style";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Input } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  GooglePlusOutlined,
} from "@ant-design/icons";
import { useFormik } from "formik";
import { StyleError } from "styles/styleCommon";
import { registerSchema } from "../../../../validations/registerSchema";

const provinceData = ["User", "Shipper"];

const Register = () => {
  const [rule, setRule] = useState("");

  const handleChangeRule = (value: any) => {
    setRule(value);
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      rule: rule,
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      console.log("👋  values:", values);
    },
  });

  console.log(formik.errors, "formik.errors");
  return (
    <StyleForm onSubmit={formik.handleSubmit}>
      <StyleContainer>
        <StyleTitle>Đăng ký</StyleTitle>
        <StyleInput>
          <Input
            size="large"
            name="fullName"
            placeholder="Họ và tên"
            prefix={<UserOutlined />}
            onChange={formik.handleChange}
            value={formik.values.fullName}
          />
          <StyleError>{formik?.errors?.fullName}</StyleError>
        </StyleInput>
        <StyleInput>
          <Input
            size="large"
            name="email"
            placeholder="Email"
            prefix={<GooglePlusOutlined />}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <StyleError>{formik?.errors?.email}</StyleError>
        </StyleInput>
        <StyleInput>
          <Input.Password
            size="large"
            name="password"
            placeholder="Mật khẩu"
            prefix={<LockOutlined />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <StyleError>{formik?.errors?.password}</StyleError>
        </StyleInput>
        <StyleInput>
          <Input.Password
            size="large"
            name="confirmPassword"
            placeholder="Xác nhận mật khẩu"
            prefix={<LockOutlined />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
          <StyleError>{formik?.errors?.confirmPassword}</StyleError>
        </StyleInput>
        <StyleRule>
          Vai trò
          <Select
            defaultValue={provinceData[0]}
            style={{ width: 120 }}
            onChange={handleChangeRule}
            options={provinceData.map((province) => ({
              label: province,
              value: province,
            }))}
          />
        </StyleRule>

        <Button type="primary" htmlType="submit" size="large">
          Đăng ký
        </Button>
      </StyleContainer>
    </StyleForm>
  );
};

export default Register;
