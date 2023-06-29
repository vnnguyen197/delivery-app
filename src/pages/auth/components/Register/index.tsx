import React, { useEffect, useState } from "react";
import { Button, Select } from "antd";
import {
  StyleContainer,
  StyleTitle,
  StyleInput,
  StyleForm,
  StyleRule,
  StyleWaiting,
} from "./style";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Input } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  GooglePlusOutlined,
  PhoneOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { useFormik } from "formik";
import { StyleError } from "styles/styleCommon";
import { registerSchema } from "../../../../validations/registerSchema";
import { useLoading } from "contexts/LoadingContext";
import { useNavigate } from "react-router-dom";
import authAPI from "services/authAPI";
import useToken from "hooks/useToken";
import { addressAPI } from "services/addressAPI";

enum ROLE {
  USER = "user",
  SHIPPER = "shipper",
}

enum GENDER {
  MALE = "Nam",
  FEMALE = "Nữ",
  OTHER = "Khác",
}

const roleArr = ["user", "shipper"];

const genderArr = ["Nam", "Nữ", "Khác"];

const Register = () => {
  const [role, setRole] = useState(ROLE.USER);
  const [gender, setGender] = useState(GENDER.MALE);
  const { setLoadingTrue, setLoadingFalse } = useLoading();
  const navigate = useNavigate();
  const { token } = useToken();
  const [error, setError] = useState("");
  const [dataProvince, setDataProvince] = useState<any>([]);
  const [dataDistrict, setDataDistrict] = useState<any>([]);
  const [dataWard, setDataWard] = useState<any>([]);
  const [value, setValue] = useState<number>();
  const [valueDistrict, setValueDistrict] = useState<number>();
  const [labelProvince, setLabelProvince] = useState<string>();
  const [labelDistrict, setLabelDistrict] = useState<string>();
  const [labelWard, setLabelWard] = useState<string>();

  useEffect(() => {
    if (token) {
      setLoadingTrue();
      navigate("/");
      setLoadingFalse();
    }
  }, []);

  const handleChangeRole = (value: any) => {
    setRole(value);
  };

  const handleChangeGender = (value: any) => {
    setGender(value);
  };

  const getAddress = async () => {
    const listProvincet = await addressAPI.getProvince();
    setDataProvince(listProvincet?.data);
  };

  const getDistrictById = async (value: number) => {
    const listDistrict = await addressAPI.getDistrictById(value);
    setDataDistrict(listDistrict?.data);
  };

  const getWardById = async (valueDistrict: number) => {
    const listWard = await addressAPI.getWardById(valueDistrict);
    setDataWard(listWard?.data);
  };

  const handleChange = (newValue: number, value: any) => {
    setLabelProvince(value?.label);
    setValue(newValue);
  };

  const handleChangeDistrict = (newValue: number, value: any) => {
    setValueDistrict(newValue);
    setLabelDistrict(value?.label);
  };

  const handleChangeWard = (newValue: number, value: any) => {
    setLabelWard(value?.label);
  };

  useEffect(() => {
    getAddress();
  }, []);

  useEffect(() => {
    if (value) getDistrictById(value as number);
  }, [value]);

  useEffect(() => {
    if (valueDistrict) getWardById(valueDistrict as number);
  }, [valueDistrict]);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: ROLE.USER,
      phoneNumber: "",
      address: "",
      gender: GENDER.MALE,
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      values.role = role;
      values.gender = gender;
      values.address = `${values.address} - ${labelWard} - ${labelDistrict} - ${labelProvince}`;
      const { confirmPassword, ...newValues } = values; // create a new object without the confirmPassword property
      try {
        setLoadingTrue();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data: token } = await authAPI.register(newValues); // use the new object to make the API call
        setTimeout(() => {
          navigate("/login");
          setLoadingFalse();
          setError("");
        }, 700);
      } catch (error: any) {
        setLoadingFalse();
        setError("Email đã tồn tại");
      }
    },
  });

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
          {formik?.errors?.fullName && (
            <StyleError>{formik?.errors?.fullName}</StyleError>
          )}
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
          {formik?.errors?.email || error ? (
            <StyleError>{formik?.errors?.email || error}</StyleError>
          ) : null}
          <StyleWaiting>
            *Vui lòng nhập chính xác email của bạn để tránh trường hợp xấu khi
            quên mật khẩu
          </StyleWaiting>
        </StyleInput>
        <StyleInput>
          <Input
            size="large"
            name="phoneNumber"
            placeholder="Số điện thoại"
            prefix={<PhoneOutlined />}
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
          />
          {formik.errors.phoneNumber && (
            <StyleError>{formik?.errors?.phoneNumber}</StyleError>
          )}
        </StyleInput>
        <StyleInput style={{ flexDirection: "row", gap: "10px" }}>
          <Select
            size="large"
            style={{ width: "33" }}
            value={value}
            placeholder="Chọn Tỉnh - TP"
            optionFilterProp="children"
            showSearch={true}
            filterOption={(input, option) =>
              option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA: any, optionB: any) =>
              optionA.label
                .toLowerCase()
                .localeCompare(optionB.label.toLowerCase())
            }
            options={dataProvince?.map((item: any) => ({
              value: item.id,
              label: item.fullName,
            }))}
            onChange={handleChange}
          />
          <Select
            size="large"
            value={valueDistrict}
            style={{ width: "33%" }}
            placeholder="Chọn Quận - Huyện"
            optionFilterProp="children"
            showSearch={true}
            filterOption={(input, option) =>
              option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA: any, optionB: any) =>
              optionA.label
                .toLowerCase()
                .localeCompare(optionB.label.toLowerCase())
            }
            options={dataDistrict?.map((item: any) => ({
              value: item.id,
              label: item.fullName,
            }))}
            onChange={handleChangeDistrict}
          />
          <Select
            size="large"
            style={{ width: "34%" }}
            placeholder="Chọn Phường - Xã"
            optionFilterProp="children"
            showSearch={true}
            filterOption={(input, option) =>
              option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA: any, optionB: any) =>
              optionA.label
                .toLowerCase()
                .localeCompare(optionB.label.toLowerCase())
            }
            options={dataWard?.map((item: any) => ({
              value: item.id,
              label: item.fullName,
            }))}
            onChange={handleChangeWard}
          />
        </StyleInput>
        <StyleInput>
          <Input
            size="large"
            name="address"
            placeholder="Nhập địa chỉ"
            prefix={<TagOutlined />}
            onChange={formik.handleChange}
            value={formik.values.address}
          />
          {formik?.errors?.address && (
            <StyleError>{formik?.errors?.address}</StyleError>
          )}
        </StyleInput>{" "}
        <StyleRule>
          Giới tính:
          <Select
            defaultValue={genderArr[0]}
            style={{ width: 120 }}
            onChange={handleChangeGender}
            options={genderArr?.map((item) => ({
              value: item,
            }))}
          />
        </StyleRule>
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
          {formik?.errors?.password && (
            <StyleError>{formik?.errors?.password}</StyleError>
          )}
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
            value={formik?.values?.confirmPassword}
          />
          {formik?.errors?.confirmPassword && (
            <StyleError>{formik?.errors?.confirmPassword}</StyleError>
          )}
        </StyleInput>
        <StyleRule>
          Vai trò:
          <Select
            defaultValue={roleArr[0]}
            style={{ width: 120 }}
            onChange={handleChangeRole}
            options={roleArr.map((role) => ({
              value: role,
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
