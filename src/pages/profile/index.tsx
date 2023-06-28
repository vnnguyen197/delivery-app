import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ButtonImg,
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
  InputAvatar,
  StyleVerify,
} from "./style";
import { Avatar, DatePicker, Input, Select, Skeleton } from "antd";
import { useFormik } from "formik";
import { editProfileSchema_ } from "validations/profileSchema";
import userAPI from "services/userAPI";
import { useLoading } from "contexts/LoadingContext";
import { EditTwoTone } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/en";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import user from "assets/images/user.png";
import { useAuthValue } from "hooks/useAuthContext";
import { UserOutlined } from "@ant-design/icons";
import { getURLImage } from "utils/getURLImage";
import { addressAPI } from "services/addressAPI";
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
  const [dataProvince, setDataProvince] = useState<any>([]);
  const [dataDistrict, setDataDistrict] = useState<any>([]);
  const [dataWard, setDataWard] = useState<any>([]);
  const [value, setValue] = useState<number>();
  const [valueDistrict, setValueDistrict] = useState<number>();
  const [gender, setGender] = useState(data?.gender);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedDateCitizen, setSelectedDateCitizen] = useState<Dayjs | null>(
    null
  );
  const [showEdit, setShowEdit] = useState(false);
  const { setLoadingTrue, setLoadingFalse } = useLoading();
  const { profile, getProfile } = useAuthValue();

  const [labelProvince, setLabelProvince] = useState<string>();
  const [labelDistrict, setLabelDistrict] = useState<string>();
  const [labelWard, setLabelWard] = useState<string>();

  const [error, setError] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [image, setImage] = useState(null);
  const [statusImg, setStatusImg] = useState<string>("none");
  const [url, setUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>();

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
    fetchData();
    getAddress();
  }, []);

  useEffect(() => {
    if (value) getDistrictById(value as number);
  }, [value]);

  useEffect(() => {
    if (valueDistrict) getWardById(valueDistrict as number);
  }, [valueDistrict]);

  const initialValues = useMemo(() => {
    return {
      fullName: data?.fullName || "",
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
      values.address = `${values.address} - ${labelWard} - ${labelDistrict} - ${labelProvince}`;
      const { email, ...newValues } = values; // create a new object without the email; property
      setShowEdit(true);
      setLoadingTrue();
      try {
        await userAPI.editUSer(newValues);
        getProfile();
        setShowEdit(false);
        setLoadingFalse();
      } catch (error: any) {
        setLoadingFalse();
      }
    },
  });

  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];
    const MAX_FILE_SIZE = 5; //limit upload avatar 5MB
    const imageMimeType = /image\/(png|jpg|jpeg)/i;
    let image;
    if (file) {
      const fileSizeKiloBytes = file?.size / Math.pow(1024, 2) + 0.05;
      if (fileSizeKiloBytes > MAX_FILE_SIZE) {
        setError("Kích thước ảnh tối đa là 5MB");
        return;
      }
      if (!file?.type.match(imageMimeType)) {
        setError("Ảnh không đúng định dạng");
        return;
      }
      setError("");
      image = e.target.files[0];
      setImage(image);
      setStatusImg("loading");
    }

    const urlAvatar = await getURLImage(image, "avatar");
    if (urlAvatar) {
      setUrl(urlAvatar as any);
      await userAPI.editUSer({
        avatar: urlAvatar,
      });
      getProfile();
      setStatusImg("");
    } else {
      setError("Lỗi ảnh");
    }
  };

  return (
    <StyleContainer onSubmit={formik.handleSubmit}>
      <StyleInfo>
        <StyleTitle>Thông tin cá nhân</StyleTitle>
        <StyleDes>Quản lý thông tin hồ sơ để bảo mật tài khoản</StyleDes>
      </StyleInfo>
      <StyleInfo style={{ marginTop: "24px" }}>
        <StyleVerify>
          Tài khoản của bạn{" "}
          {profile?.citizenAdd === "" ||
          profile?.citizenId === "" ||
          profile?.citizenDate === "" ? (
            <>
              <span style={{ color: "red" }}>chưa được xác thực</span>
              <div style={{ color: "orange" }}>
                Vui lòng xác thực tài khoản (thêm CCCD, nơi cấp, ngày cấp) để
                chúng tôi có thể bảo vệ bạn tốt hơn
              </div>
            </>
          ) : (
            <span style={{ color: "green" }}>đã được xác thực</span>
          )}
        </StyleVerify>
      </StyleInfo>
      <StyleProfile>
        <StyleListLeft>
          <StyleAvatar>
            <ButtonImg
              onClick={() => {
                if ((!showEdit || formik.values) && !formik.dirty) {
                  inputRef.current?.click();
                }
              }}
            >
              {statusImg === "loading" && (
                <Skeleton.Avatar
                  active
                  size="small"
                  style={{ width: 115, height: 115 }}
                />
              )}
              {statusImg !== "loading" && (
                <Avatar
                  src={url ? url : data?.avatar ? data?.avatar : user}
                  style={{ width: 115, height: 115 }}
                  icon={<UserOutlined />}
                />
              )}
            </ButtonImg>
            <InputAvatar
              type="file"
              onChange={handleImageChange}
              style={{ display: "none" }}
              ref={inputRef as any}
            />
          </StyleAvatar>
          {error && (
            <StyleError style={{ paddingLeft: "0" }}>{error}</StyleError>
          )}
          <StyleTitleUser>
            {profile?.fullName}
            <EditTwoTone
              style={{ paddingLeft: "8px" }}
              onClick={() => setShowEdit(!showEdit)}
            />
          </StyleTitleUser>
          {showEdit ? (
            <>
              <Input
                size="large"
                style={{ width: "70%" }}
                name="fullName"
                onChange={formik.handleChange}
                value={formik.values.fullName}
              />
              <StyleError style={{ paddingLeft: "0" }}>
                {formik?.errors?.fullName}
              </StyleError>
            </>
          ) : null}
          <StyleRuleUser>Role : {data?.role}</StyleRuleUser>
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
              <Select
                style={{ width: 200 }}
                value={value}
                placeholder="Chọn Tỉnh - Thành Phố"
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
                value={valueDistrict}
                style={{ width: 200 }}
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
                style={{ width: 200 }}
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
            <StyleError></StyleError>
            <StyleInput>
              <StyleLabel style={{width: "10%"}}>Địa chỉ: </StyleLabel>
              <Input
                size="large"
                name="address"
                placeholder="Nhập địa chỉ"
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
