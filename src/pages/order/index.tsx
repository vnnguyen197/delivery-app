import React, { useState } from "react";
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
  StyleRulesGroup
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

const Order = () => {
  const { setLoadingTrue, setLoadingFalse } = useLoading();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const [isCheck, setIsCheck] = useState(false);

  // const getTags = asyns() => {
  //     const dataTag = await
  // }

  const formik = useFormik({
    initialValues: {
      name: "",
      productVolume: "",
      description: "",
      senderName: "",
      senderPhone: "",
      senderAddress: "",
      receiverName: "",
      receiverPhone: "",
      receiverAddress: "",
    },
    validationSchema: addOrderSchema_,
    onSubmit: async (values) => {
      setLoadingTrue();
      if (isCheck) {
        try {
          await orderAPI.createOrder(values);
          navigate("/");
          setLoadingFalse();
        } catch (error: any) {
          setLoadingFalse();
        }
      } else {
        setError("Điều khoản và dịch vụ không được để trống");
        setLoadingFalse();
      }
    },
  });

  const onChange = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
    setIsCheck(true);
    setError("");
  };

  const handleOk = () => {
    setChecked(false);
  };

  return (
    <StyleContainer onSubmit={formik.handleSubmit}>
      <StyleInfo>
        <StyleTitle>Đăng ký gởi hàng</StyleTitle>
        <StyleDes>
          Đăng ký gởi hàng liên quan đến các thông tin của đơn hàng
        </StyleDes>
      </StyleInfo>
      <StyleProfile>
        <StyleInput style={{ width: "50%" }}>
          <StyleInfoUser>Thông tin gói hàng</StyleInfoUser>
          <Input
            size="large"
            name="name"
            placeholder="Tên gói đơn"
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
            placeholder="Khối lượng (gam)"
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
          {/* <Input
            size="large"
            name="description"
            placeholder="Các tag loại hàng"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          {formik.errors.description && (
            <StyleError>{formik?.errors?.description}</StyleError>
          )} */}
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            defaultValue={["a10", "c12"]}
            // onChange={handleChange}
            // options={options}
          />
        </StyleInput>
        <StyleListRight>
          <StyleInput>
            <StyleInfoUser>Thông tin người gởi</StyleInfoUser>
            <Input
              size="large"
              name="senderName"
              placeholder="Họ và tên người gởi"
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
          <StyleInput>
            <Input
              size="large"
              name="senderAddress"
              placeholder="Địa chỉ"
              onChange={formik.handleChange}
              value={formik.values.senderAddress}
            />
            {formik?.errors?.senderAddress && (
              <StyleError>{formik?.errors?.senderAddress}</StyleError>
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
          <StyleInput>
            <Input
              size="large"
              name="receiverAddress"
              placeholder="Địa chỉ"
              onChange={formik.handleChange}
              value={formik.values.receiverAddress}
            />
            {formik?.errors?.receiverAddress && (
              <StyleError>{formik?.errors?.receiverAddress}</StyleError>
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
            open={checked}
            onOk={handleOk}
            onCancel={handleOk}
            width={800}
          >
            <StyleRulesGroup  >
              <div style={{ textAlign: "center", fontSize: "16px", fontWeight: "600" }}>ĐIỀU KHOẢN SỬ DỤNG</div>
              <StyleRules>
                1. Người dùng đồng ý và cam kết không gửi bất kỳ hàng hóa nào vi
                phạm pháp luật khi sử dụng dịch vụ giao hàng nhanh được cung cấp
                bởi chúng tôi.
              </StyleRules>
              <StyleRules>
                2. Người dùng xác nhận rằng tất cả các hàng hóa gửi đi đều tuân
                thủ các quy định, quy tắc và luật pháp hiện hành trong nước và
                quốc tế. Điều này bao gồm, nhưng không giới hạn, các quy định về
                xuất nhập khẩu, quy định về vận chuyển hàng hóa nguy hiểm, hàng
                hóa bị cấm hoặc hạn chế, hàng hóa bảo vệ quyền sở hữu trí tuệ,
                hàng hóa vi phạm quyền riêng tư và quyền tác giả, và mọi quy
                định khác liên quan đến gửi hàng hóa.
              </StyleRules>
              <StyleRules>
                3. Người dùng cam kết rằng thông tin về hàng hóa gửi đi là chính
                xác, đầy đủ và không gian lận. Người dùng chịu trách nhiệm xác
                định các loại hàng hóa được phép gửi và đảm bảo rằng hàng hóa
                đáp ứng các tiêu chuẩn và quy định cần thiết.{" "}
              </StyleRules>
              <StyleRules>
                4. Chúng tôi có quyền từ chối việc gửi và vận chuyển bất kỳ hàng
                hóa nào mà chúng tôi xác định là vi phạm pháp luật hoặc không
                tuân thủ các quy định và quy tắc nêu trên. Chúng tôi cũng có
                quyền chấm dứt hoặc tạm ngừng dịch vụ cho Người dùng vi phạm
                điều khoản này.
              </StyleRules>
              <StyleRules>
                5. Người dùng chịu trách nhiệm đồng thuận rằng nếu bất kỳ vi
                phạm pháp luật nào xảy ra trong quá trình sử dụng dịch vụ giao
                hàng nhanh, người dùng sẽ chịu mọi trách nhiệm pháp lý và tài
                chính liên quan đến việc đó, bao gồm cả mất mát và thiệt hại gây
                ra cho bên thứ ba hoặc chúng tôi.
              </StyleRules>
              <StyleRules>
                6. Chúng tôi không chịu trách nhiệm về nội dung, tính chính xác
                hoặc hợp pháp của hàng hóa gửi đi bởi Người dùng. Người dùng
                đồng ý rằng chúng tôi không có nghĩa vụ kiểm tra hoặc xác minh
                tính hợp pháp của hàng hóa.{" "}
              </StyleRules>
              <StyleRules>
                7. Người dùng đồng ý cung cấp mọi thông tin cần thiết về hàng
                hóa và thực hiện các biện pháp an ninh và đóng gói đảm bảo rằng
                hàng hóa không gây nguy hiểm cho người vận chuyển, nhân viên và
                bên thứ ba liên quan.
              </StyleRules>
              <StyleRules>
                8. Chúng tôi có quyền thu thập, sử dụng và lưu trữ thông tin
                liên quan đến việc gửi hàng hóa và sử dụng dịch vụ giao hàng
                nhanh. Chúng tôi cam kết bảo mật thông tin người dùng và tuân
                thủ quy định về bảo vệ dữ liệu cá nhân hiện hành.
              </StyleRules>
              <StyleRules>
                9. Người dùng đồng ý rằng chúng tôi có thể sửa đổi hoặc điều
                chỉnh các điều khoản và điều kiện này theo quyết định riêng của
                chúng tôi. Bất kỳ thay đổi nào sẽ được thông báo trước cho Người
                dùng để có thời gian thích hợp để xem xét và chấp nhận các điều
                khoản mới.
              </StyleRules>
              <StyleRules>
                10.Chúng tôi có quyền theo dõi và kiểm tra hoạt động sử dụng
                dịch vụ giao hàng nhanh của Người dùng để đảm bảo tuân thủ các
                điều khoản và điều kiện này. Trong trường hợp chúng tôi phát
                hiện bất kỳ vi phạm pháp luật hoặc vi phạm các quy định và quy
                tắc, chúng tôi có quyền chấm dứt hoặc tạm ngừng dịch vụ mà không
                cần thông báo trước.
              </StyleRules>

              <div style={{ color: "red" }}>
                Lưu ý: Shipper có quyền kiểm tra hàng hoá và báo với cơ quan
                chức năng nếu đơn hàng của bạn vi phạm pháp luật
              </div>
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
