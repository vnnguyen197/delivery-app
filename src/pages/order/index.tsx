import React, { useEffect, useState } from "react";
import {
  StyleButton,
  StyleContainer,
  StyleDes,
  StyleInfo,
  StyleInput,
  StyleListLeft,
  StyleListRight,
  StyleProfile,
  StyleTitle,
  StyleInfoUser,
  StyleRules,
  StyleRulesGroup,
} from "./style";
import { Input, Modal, Select } from "antd";
import { useFormik } from "formik";
import { StyleError } from "styles/styleCommon";
import { addOrderSchema_ } from "validations/orderSchema";
import { useLoading } from "contexts/LoadingContext";
import orderAPI from "services/orderAPI";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useAuthValue } from "hooks/useAuthContext";
import { addressAPI } from "services/addressAPI";

const { Option } = Select;

const Order = () => {
  const { setLoadingTrue, setLoadingFalse } = useLoading();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isCheck, setIsCheck] = useState(false);
  console.log("👋  isCheck:", isCheck);
  const [isRules, setIsRules] = useState(false);
  console.log("👋  isRules:", isRules);
  const { profile } = useAuthValue();
  const [openModal, setOpenModal] = useState(false);
  //address
  const [dataProvince, setDataProvince] = useState<any>([]);
  const [dataDistrict, setDataDistrict] = useState<any>([]);
  const [dataWard, setDataWard] = useState<any>([]);
  const [value, setValue] = useState<number>();
  const [valueDistrict, setValueDistrict] = useState<number>();
  const [valueWard, setValueWard] = useState<number>();
  const [labelProvince, setLabelProvince] = useState<string>();
  const [labelDistrict, setLabelDistrict] = useState<string>();
  const [labelWard, setLabelWard] = useState<string>();
  const [valueReceiver, setValueReceiver] = useState<number>();
  const [valueDistrictReceiver, setValueDistrictReceiver] = useState<number>();
  const [valueWardReceiver, setValueWardReceiver] = useState<number>();

  //receiver address
  const [labelProvinceReceiver, setLabelProvinceReceiver] = useState<string>();
  const [labelDistrictReceiver, setLabelDistrictReceiver] = useState<string>();
  const [labelWardReceiver, setLabelWardReceiver] = useState<string>();

  const formik = useFormik({
    initialValues: {
      name: "",
      productVolume: "",
      description: "",
      senderName: "",
      senderPhone: "",
      senderStreet: "",
      receiverName: "",
      receiverPhone: "",
      receiverStreet: "",
      tags: [],
      provinceSenderId: value,
      districtSenderId: valueDistrict,
      wardSenderId: valueWard,
      provinceReceiverId: valueReceiver,
      districtReceiverId: valueDistrictReceiver,
      wardReceiverId: valueWardReceiver,
    },
    validationSchema: addOrderSchema_,
    onSubmit: async (values) => {
      values.tags = selectedTags;
      values.senderStreet = `${values.senderStreet} - ${labelWard} - ${labelDistrict} - ${labelProvince}`;
      values.receiverStreet = `${values.receiverStreet} - ${labelWardReceiver} - ${labelDistrictReceiver} - ${labelProvinceReceiver}`;
      values.provinceSenderId = value;
      values.districtSenderId = valueDistrict;
      values.wardSenderId = valueWard;
      values.provinceReceiverId = valueReceiver;
      values.districtReceiverId = valueDistrictReceiver;
      values.wardReceiverId = valueWardReceiver;
      setLoadingTrue();
      const { ...newValues } = values; // create a new object without the email; property
      if (isRules === true) {
        if (
          profile?.citizenAdd !== "" &&
          profile?.citizenId !== "" &&
          profile?.citizenDate !== ""
        ) {
          try {
            await orderAPI.createOrder(newValues);
            navigate("/");
            setLoadingFalse();
          } catch (error: any) {
            setLoadingFalse();
          }
        } else {
          setError("Vui lòng xác thực tài khoản để có thể tạo order");
          setLoadingFalse();
          console.log("aa1");
        }
      } else {
        setError("Điều khoản và dịch vụ không được để trống");
        setLoadingFalse();
      }
    },
  });

  const onChange = () => {
    setIsCheck(true);
    setOpenModal(true);
    setError("");
  };

  const onChangeRules = (e: CheckboxChangeEvent) => {
    setIsRules(!isRules);
    setError("");
  };

  const handleOk = () => {
    if (isRules) {
      setIsRules(true);
      setOpenModal(false);
      setError("");
    } else {
      setError("Vui lòng đồng ý điều khoản của chúng tôi");
    }
  };

  const handleCancel = () => {
    setIsCheck(false);
  };

  const getTags = async () => {
    const dataListTag = await orderAPI?.getTag();
    setTags(dataListTag?.data);
  };

  useEffect(() => {
    getTags();
  }, []);

  const handleChangeTags = (selectedValues: any) => {
    setSelectedTags(selectedValues);
  };

  const getAddress = async () => {
    const listProvincet = await addressAPI.getProvince();
    setDataProvince(listProvincet?.data);
  };

  const getDistrictById = async (value: number, valueReceiver: number) => {
    if (value) {
      const listDistrict = await addressAPI.getDistrictById(value);
      setDataDistrict(listDistrict?.data);
    }
    if (valueReceiver) {
      let listDistrict = await addressAPI.getDistrictById(valueReceiver);
      setDataDistrict(listDistrict?.data);
    }
  };

  const getWardById = async (
    valueDistrict: number,
    valueDistrictReceiver: number
  ) => {
    if (valueDistrict) {
      const listWard = await addressAPI.getWardById(valueDistrict);
      setDataWard(listWard?.data);
    }
    if (valueDistrictReceiver) {
      const listWard = await addressAPI.getWardById(valueDistrictReceiver);
      setDataWard(listWard?.data);
    }
  };

  const handleChange = (newValue: number, value: any) => {
    setLabelProvince(value?.label);
    setValue(newValue);
  };

  const handleChangeProvinceReceiver = (newValue: number, value: any) => {
    setValueReceiver(newValue);
    setLabelProvinceReceiver(value?.label);
  };

  const handleChangeDistrict = (newValue: number, value: any) => {
    setValueDistrict(newValue);
    setLabelDistrict(value?.label);
  };

  const handleChangeDistrictReceiver = (newValue: number, value: any) => {
    setValueDistrictReceiver(newValue);
    setLabelDistrictReceiver(value?.label);
  };

  const handleChangeWard = (newValue: number, value: any) => {
    setLabelWard(value?.label);
    setValueWard(newValue);
  };

  const handleChangeWardReceiver = (newValue: number, value: any) => {
    setLabelWardReceiver(value?.label);
    setValueWardReceiver(newValue);
  };

  useEffect(() => {
    getAddress();
  }, []);

  useEffect(() => {
    if (value || valueReceiver)
      getDistrictById(value as number, valueReceiver as number);
  }, [value, valueReceiver]);

  useEffect(() => {
    if (valueDistrict)
      getWardById(valueDistrict as number, valueDistrictReceiver as number);
  }, [valueDistrict, valueDistrictReceiver]);

  return (
    <StyleContainer onSubmit={formik.handleSubmit}>
      <StyleInfo>
        <StyleTitle>Tạo đơn hàng</StyleTitle>
        <StyleDes>
          Tạo đơn hàng liên quan đến các thông tin của đơn hàng
        </StyleDes>
      </StyleInfo>
      <StyleProfile>
        <StyleInput style={{ width: "50%" }}>
          <StyleInfoUser>Thông tin gói hàng</StyleInfoUser>
          <Input
            size="large"
            name="name"
            placeholder="Tên gói hàng"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name && (
            <StyleError>{formik?.errors?.name}</StyleError>
          )}
        </StyleInput>
        <StyleInput style={{ width: "50%" }}>
          <Input
            type="number"
            size="large"
            name="productVolume"
            placeholder="Khối lượng (kg)"
            onChange={formik.handleChange}
            value={formik.values.productVolume}
          />
          {formik.errors.productVolume && (
            <StyleError>{formik?.errors?.productVolume}</StyleError>
          )}
        </StyleInput>
        <StyleInput style={{ width: "50%" }}>
          <Input
            size="large"
            name="description"
            placeholder="Chi tiết gói hàng"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          {formik.errors.description && (
            <StyleError>{formik?.errors?.description}</StyleError>
          )}
        </StyleInput>
        <StyleInput style={{ width: "50%" }}>
          <Select
            size="large"
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Vui lòng chọn tags"
            value={selectedTags}
            onChange={handleChangeTags}
          >
            {tags.map((tag: any) => (
              <Option key={tag.id} value={tag.id}>
                {tag.name}
              </Option>
            ))}
          </Select>
        </StyleInput>
        <StyleListRight>
          <StyleInput>
            <StyleInfoUser>Thông tin người gửi</StyleInfoUser>
            <Input
              size="large"
              name="senderName"
              placeholder="Họ và tên người gửi"
              onChange={formik.handleChange}
              value={formik.values.senderName}
            />
            {formik.errors.senderName && (
              <StyleError>{formik?.errors?.senderName}</StyleError>
            )}
          </StyleInput>
          <StyleInput>
            <Input
              size="large"
              name="senderPhone"
              placeholder="Số điện thoại"
              onChange={formik.handleChange}
              value={formik.values.senderPhone}
            />
            {formik.errors.senderPhone && (
              <StyleError>{formik?.errors?.senderPhone}</StyleError>
            )}
          </StyleInput>
          <StyleInput style={{ flexDirection: "row", gap: "10px" }}>
            <Select
              size="large"
              style={{ width: "33%" }}
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
              style={{ width: "33%" }}
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
              name="senderStreet"
              placeholder="Nhập địa chỉ người gửi"
              onChange={formik.handleChange}
              value={formik.values.senderStreet}
            />
            {formik?.errors?.senderStreet && (
              <StyleError>{formik?.errors?.senderStreet}</StyleError>
            )}
          </StyleInput>
        </StyleListRight>
        <StyleListLeft>
          <StyleInput>
            <StyleInfoUser>Thông tin người nhận</StyleInfoUser>
            <Input
              size="large"
              name="receiverName"
              placeholder="Họ và tên người nhận"
              onChange={formik.handleChange}
              value={formik.values.receiverName}
            />
            {formik.errors.receiverName && (
              <StyleError>{formik?.errors?.receiverName}</StyleError>
            )}
          </StyleInput>
          <StyleInput>
            <Input
              size="large"
              name="receiverPhone"
              placeholder="Số điện thoại"
              onChange={formik.handleChange}
              value={formik.values.receiverPhone}
            />
            {formik.errors.receiverPhone && (
              <StyleError>{formik?.errors?.receiverPhone}</StyleError>
            )}
          </StyleInput>
          <StyleInput style={{ flexDirection: "row", gap: "10px" }}>
            <Select
              size="large"
              style={{ width: "33%" }}
              value={valueReceiver}
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
              onChange={handleChangeProvinceReceiver}
            />
            <Select
              size="large"
              value={valueDistrictReceiver}
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
              onChange={handleChangeDistrictReceiver}
            />
            <Select
              size="large"
              style={{ width: "33%" }}
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
              onChange={handleChangeWardReceiver}
            />
          </StyleInput>
          <StyleInput>
            <Input
              size="large"
              name="receiverStreet"
              placeholder="Nhập địa chỉ người nhận"
              onChange={formik.handleChange}
              value={formik.values.receiverStreet}
            />
            {formik?.errors?.receiverStreet && (
              <StyleError>{formik?.errors?.receiverStreet}</StyleError>
            )}
          </StyleInput>
          <Checkbox onChange={onChange}>
            Đồng ý với <strong>Điều khoản dịch vụ</strong> và{" "}
            <strong>Quy định Riêng tư Cá nhân</strong> của chúng tôi.
          </Checkbox>
          <Modal
            centered
            title="Bạn đã chắc chắn rằng mình sẽ không gửi hàng cấm / hàng vi phạm
            pháp luật chứ?"
            open={openModal}
            onOk={handleOk}
            onCancel={handleCancel}
            width={800}
          >
            <StyleRulesGroup>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                ĐIỀU KHOẢN DỊCH VỤ
              </div>
              <>
                <StyleRules>
                  1. Khách hàng đồng ý và cam kết không gửi bất kỳ hàng hóa nào
                  vi phạm pháp luật khi sử dụng dịch vụ giao hàng nhanh được
                  cung cấp bởi chúng tôi.
                </StyleRules>
                <StyleRules>
                  2. Khách hàng xác nhận rằng tất cả các hàng hóa gửi đi đều
                  tuân thủ các quy định, quy tắc và luật pháp hiện hành trong
                  nước và quốc tế. Điều này bao gồm, nhưng không giới hạn, các
                  quy định về xuất nhập khẩu, quy định về vận chuyển hàng hóa
                  nguy hiểm, hàng hóa bị cấm hoặc hạn chế, hàng hóa bảo vệ quyền
                  sở hữu trí tuệ, hàng hóa vi phạm quyền riêng tư và quyền tác
                  giả, và mọi quy định khác liên quan đến gửi hàng hóa.
                </StyleRules>
                <StyleRules>
                  3. Khách hàng cam kết rằng thông tin về hàng hóa gửi đi là
                  chính xác, đầy đủ và không gian lận. Khách hàng chịu trách
                  nhiệm xác định các loại hàng hóa được phép gửi và đảm bảo rằng
                  hàng hóa đáp ứng các tiêu chuẩn và quy định cần thiết.{" "}
                </StyleRules>
                <StyleRules>
                  4. Chúng tôi có quyền từ chối việc gửi và vận chuyển bất kỳ
                  hàng hóa nào mà chúng tôi xác định là vi phạm pháp luật hoặc
                  không tuân thủ các quy định và quy tắc nêu trên. Chúng tôi
                  cũng có quyền chấm dứt hoặc tạm ngừng dịch vụ cho Khách hàng
                  vi phạm điều khoản này.
                </StyleRules>
                <StyleRules>
                  5. Khách hàng chịu trách nhiệm đồng thuận rằng nếu bất kỳ vi
                  phạm pháp luật nào xảy ra trong quá trình sử dụng dịch vụ giao
                  hàng nhanh, Khách hàng sẽ chịu mọi trách nhiệm pháp lý và tài
                  chính liên quan đến việc đó, bao gồm cả mất mát và thiệt hại
                  gây ra cho bên thứ ba hoặc chúng tôi.
                </StyleRules>
                <StyleRules>
                  6. Chúng tôi không chịu trách nhiệm về nội dung, tính chính
                  xác hoặc hợp pháp của hàng hóa gửi đi bởi Khách hàng. Người
                  dùng đồng ý rằng chúng tôi không có nghĩa vụ kiểm tra hoặc xác
                  minh tính hợp pháp của hàng hóa.{" "}
                </StyleRules>
                <StyleRules>
                  7. Khách hàng đồng ý cung cấp mọi thông tin cần thiết về hàng
                  hóa và thực hiện các biện pháp an ninh và đóng gói đảm bảo
                  rằng hàng hóa không gây nguy hiểm cho người vận chuyển, nhân
                  viên và bên thứ ba liên quan.
                </StyleRules>
                <StyleRules>
                  8. Chúng tôi có quyền thu thập, sử dụng và lưu trữ thông tin
                  liên quan đến việc gửi hàng hóa và sử dụng dịch vụ giao hàng
                  nhanh. Chúng tôi cam kết bảo mật thông tin Khách hàng và tuân
                  thủ quy định về bảo vệ dữ liệu cá nhân hiện hành.
                </StyleRules>
                <StyleRules>
                  9. Khách hàng đồng ý rằng chúng tôi có thể sửa đổi hoặc điều
                  chỉnh các điều khoản và điều kiện này theo quyết định riêng
                  của chúng tôi. Bất kỳ thay đổi nào sẽ được thông báo trước cho
                  Khách hàng để có thời gian thích hợp để xem xét và chấp nhận
                  các điều khoản mới.
                </StyleRules>
                <StyleRules>
                  10.Chúng tôi có quyền theo dõi và kiểm tra hoạt động sử dụng
                  dịch vụ giao hàng nhanh của Khách hàng để đảm bảo tuân thủ các
                  điều khoản và điều kiện này. Trong trường hợp chúng tôi phát
                  hiện bất kỳ vi phạm pháp luật hoặc vi phạm các quy định và quy
                  tắc, chúng tôi có quyền chấm dứt hoặc tạm ngừng dịch vụ mà
                  không cần thông báo trước.
                </StyleRules>
              </>
              <div style={{ color: "orange" }}>
                Lưu ý: Shipper có quyền kiểm tra hàng hoá và báo với cơ quan
                chức năng nếu đơn hàng của bạn vi phạm pháp luật
              </div>
              <Checkbox onChange={onChangeRules}>
                Đồng ý với <strong>Điều khoản dịch vụ</strong> và{" "}
                <strong>Quy định Riêng tư Cá nhân</strong> của chúng tôi.
              </Checkbox>
              {error ? (
                <StyleError style={{ margin: "0px" }}>{error}</StyleError>
              ) : null}
            </StyleRulesGroup>
          </Modal>
          {error ? <StyleError>{error}</StyleError> : null}
        </StyleListLeft>
      </StyleProfile>

      <StyleButton type="submit">Tạo đơn</StyleButton>
    </StyleContainer>
  );
};

export default Order;
