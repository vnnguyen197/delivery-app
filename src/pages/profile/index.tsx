import React, { useEffect, useMemo, useState } from "react";
import {
  StyleAvatar,
  StyleButton,
  StyleContainer,
  StyleDes,
  StyleError,
  StyleInfo,
  StyleInput,
  StyleItemLeft,
  StyleItemRight,
  StyleLabel,
  StyleListLeft,
  StyleListRight,
  StyleProfile,
  StyleRuleUser,
  StyleTitle,
  StyleTitleUser,
} from "./style";
import { Avatar, DatePicker, Input, Select } from "antd";
import { useFormik } from "formik";
import { editProfileSchema_ } from "validations/profileSchema";
import userAPI from "services/userAPI";
import { useLoading } from "contexts/LoadingContext";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import shipper from "assets/images/shipper.jpg";
import user from "assets/images/user.png";
import "dayjs/locale/en";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
dayjs.extend(customParseFormat); // import the locale you need
dayjs.locale("en");
dayjs.extend(weekday);
dayjs.extend(localeData);

interface IProfile {
  fullName: string;
  role?: string;
  email?: string;
  address: string;
  avatar?: string;
  birthday?: any;
  citizenAdd?: string;
  citizenId?: string;
  citizenDate?: any;
  createAt?: string;
  deleteAt?: string;
  gender: string;
  id?: string;
  password?: string;
  phoneNumber: string;
  updateAt?: string;
}

const genderArr = ["Nam", "Nữ", "Khác"];

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

const Profile = () => {
  const [data, setData] = useState<IProfile>();
  const [gender, setGender] = useState(data?.gender);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedDateCitizen, setSelectedDateCitizen] = useState<Dayjs | null>(
    null
  );

  const { setLoadingTrue, setLoadingFalse } = useLoading();

  const handleChangeGender = (value: any) => {
    setGender(value);
  };

  const disabledDate = (current: Dayjs) => {
    // Disable dates after today
    return current.isAfter(dayjs().endOf("day"));
  };

  const fetchData = async () => {
    try {
      const { data } = await userAPI.getUser();
      if (data) {
        setData(data);
        setGender(data?.gender);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const initialValues = useMemo(() => {
    return {
      email: data?.email || "",
      birthday: data?.birthday || undefined,
      citizenId: data?.citizenId || "",
      citizenDate: data?.citizenDate || undefined,
      citizenAdd: data?.citizenAdd || "",
      phoneNumber: data?.phoneNumber || "",
      address: data?.address || "",
      gender: gender ? gender : data?.gender,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, gender, selectedDate]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: editProfileSchema_,
    onSubmit: async (values) => {
      values.citizenDate = selectedDateCitizen
        ? selectedDateCitizen
        : undefined;
      values.birthday = selectedDate ? selectedDate : undefined;
      const { email, ...newValues } = values; // create a new object without the email; property
      setLoadingTrue();
      try {
        await userAPI.editUSer(newValues);
        setLoadingFalse();
      } catch (error: any) {
        setLoadingFalse();
      }
    },
  });

  return (
    <StyleContainer onSubmit={formik.handleSubmit}>
      <StyleInfo>
        <StyleTitle>Thông tin cá nhân</StyleTitle>
        <StyleDes>Quản lý thông tin hồ sơ để bảo mật tài khoản</StyleDes>
      </StyleInfo>
      <StyleProfile>
        <StyleListLeft>
          <StyleAvatar>
            <Avatar
              src={data?.role === "user" ? user : shipper}
              style={{ width: 120, height: 120 }}
            />
          </StyleAvatar>
          <StyleTitleUser>{data?.fullName}</StyleTitleUser>
          <StyleRuleUser>Rule : {data?.role}</StyleRuleUser>
        </StyleListLeft>
        <StyleListRight>
          <StyleItemRight>
            <StyleInput>
              <StyleLabel>Email: </StyleLabel>
              <Input
                readOnly
                size="large"
                name="email"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik?.values?.email}
              />
            </StyleInput>
            <StyleError>{formik?.errors?.email}</StyleError>
            <StyleInput>
              <StyleLabel>Số điện thoại: </StyleLabel>
              <Input
                size="large"
                name="phoneNumber"
                placeholder="Số điện thoại"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
              />
            </StyleInput>
            <StyleError>{formik?.errors?.phoneNumber}</StyleError>
            <StyleInput>
              <StyleLabel>Giới tính: </StyleLabel>
              <Select
                size="large"
                value={gender}
                style={{ width: "100%" }}
                onChange={handleChangeGender}
                options={genderArr?.map((item) => ({
                  value: item,
                }))}
              />
            </StyleInput>
            <StyleError></StyleError>
            <StyleInput>
              <StyleLabel>Ngày sinh: </StyleLabel>
              <DatePicker
                size="large"
                style={{ width: "100%" }}
                name="birthday"
                placeholder="Ngày sinh"
                defaultValue={dayjs(data?.birthday)}
                value={
                  selectedDate
                    ? dayjs(selectedDate)
                    : data?.birthday
                    ? dayjs(data?.birthday)
                    : undefined
                }
                onChange={(date, dateString) =>
                  setSelectedDate(date ? dayjs(date) : null)
                }
                format={dateFormatList}
                disabledDate={disabledDate}
              />
            </StyleInput>
          </StyleItemRight>
          <div style={{ borderRight: "2px solid #fff" }}></div>
          <StyleItemLeft>
            <StyleInput>
              <StyleLabel>CCCD/CMND: </StyleLabel>
              <Input
                size="large"
                name="citizenId"
                placeholder="CCCD/CMND"
                onChange={formik.handleChange}
                value={formik.values.citizenId}
              />
            </StyleInput>
            <StyleError>{formik?.errors?.citizenId}</StyleError>
            <StyleInput>
              <StyleLabel>Nơi cấp: </StyleLabel>
              <Input
                size="large"
                name="citizenAdd"
                placeholder="Nơi cấp"
                onChange={formik.handleChange}
                value={formik.values.citizenAdd}
              />
            </StyleInput>
            <StyleError>{formik?.errors?.citizenAdd}</StyleError>
            <StyleInput>
              <StyleLabel>Ngày cấp: </StyleLabel>
              <DatePicker
                size="large"
                style={{ width: "100%" }}
                name="citizenDate"
                placeholder="Ngày cấp"
                defaultValue={dayjs(
                  dayjs(data?.citizenDate)?.format("DD-MM-YYYY"),
                  dateFormatList[0]
                )}
                value={
                  selectedDateCitizen
                    ? dayjs(selectedDateCitizen)
                    : data?.citizenDate
                    ? dayjs(data?.citizenDate)
                    : undefined
                }
                onChange={(date, dateString) =>
                  setSelectedDateCitizen(date ? dayjs(date) : null)
                }
                format={dateFormatList}
                disabledDate={disabledDate}
              />
            </StyleInput>
            <StyleError></StyleError>
            <StyleInput>
              <StyleLabel>Địa chỉ: </StyleLabel>
              <Input
                size="large"
                name="address"
                placeholder="Địa chỉ"
                onChange={formik.handleChange}
                value={formik.values.address}
              />
            </StyleInput>
          </StyleItemLeft>
        </StyleListRight>
      </StyleProfile>
      <StyleButton type="submit">Lưu thay đổi</StyleButton>
    </StyleContainer>
  );
};

export default Profile;
