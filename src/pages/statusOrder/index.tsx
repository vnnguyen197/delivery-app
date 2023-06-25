import React, { useEffect, useState } from "react";
import { Alert, Button, Modal, Tabs } from "antd";
import {
  StyleContainer,
  StyleDes,
  StyleInfo,
  StyleTitle,
  StyleContent,
  StyleContentOrder,
  StyleContentTitle,
  StyleContentDetails,
  StyleContentSender,
  StyleButton,
  StyleOrder,
  StyleErrorPopup,
  StyleTitleEmpty,
  StyleEmptyOrder,
  StyleDetailTitle,
  StyleDetailSubTitle,
  StyleInfoUser,
  StyleModal,
  StyleContentCenter,
} from "./style";
import orderAPI from "services/orderAPI";
import { useAuthValue } from "hooks/useAuthContext";
import { useLoading } from "contexts/LoadingContext";
import empty from "assets/images/empty_result.svg";

const StatusOrder: React.FC = () => {
  const [dataAll, setDataAll] = useState([]);
  const [dataDetails, setDataDetails] = useState<any>([]);
  const [dataOrderWaiting, setDataOrderWaiting] = useState<any>([]);
  const [dataChangeStatus, setDataChangeStatus] = useState([]);
  const [status, setStatus] = useState("WAITING");
  const [idOrder, setIdOrder] = useState("");
  const [isCheckError, setIsCheckError] = useState(false);
  const [isCheckVerify, setIsCheckVerify] = useState(false);
  const { setLoadingTrue, setLoadingFalse } = useLoading();
  const { profile } = useAuthValue();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onChange = (key: string) => {
    setStatus(key);
  };

  const handleChangeStatus = async (id: any, status: any) => {
    setLoadingTrue();
    if (
      profile?.citizenAdd !== "" ||
      profile?.citizenId !== "" ||
      profile?.citizenDate !== ""
    ) {
      try {
        await orderAPI.updateOrder(id, { status });
        setLoadingFalse();
        fetchDataOrder();
      } catch (error: any) {
        setLoadingFalse();
        setIsCheckError(true);
      }
    } else {
      setIsCheckVerify(true);
      setLoadingFalse();
    }
  };

  const fetchDataOrder = async () => {
    const dataOrderStatus = await orderAPI.getOrderStatus(status);
    const dataOrdersAll = await orderAPI.getOrdersAll();
    setDataAll(dataOrdersAll?.data?.rows);
    setDataChangeStatus(dataOrderStatus?.data?.rows);
  };

  const fetchDataOrderDetail = async () => {
    const dataDetailOrder = await orderAPI.getOrderDetail(idOrder);
    setDataDetails(dataDetailOrder?.data);
  };

  const fetchDataOrderWaiting = async () => {
    const dataDetailOrderWaiting = await orderAPI.getOrderWaiting();
    setDataOrderWaiting(dataDetailOrderWaiting?.data?.rows);
  };

  useEffect(() => {
    fetchDataOrder();
    fetchDataOrderWaiting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    fetchDataOrderDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idOrder]);

  const showModal = (id: any) => {
    setIsModalOpen(true);
    setIdOrder(id);
  };

  const filterCountWaiting = dataAll?.filter(
    (item: any) => item?.status === "WAITING"
  );

  const filterCountShipping = dataAll?.filter(
    (item: any) => item?.status === "SHIPPING"
  );

  const filterCountDone = dataAll?.filter(
    (item: any) => item?.status === "DONE"
  );

  const filterCountCancel = dataAll?.filter(
    (item: any) => item?.status === "CANCEL"
  );

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items: any = [
    {
      key: "WAITING",
      label:
        profile?.role === "user"
          ? `Đơn chờ xác nhận (${filterCountWaiting.length})`
          : `Đơn chưa nhận (${dataOrderWaiting.length})`,
      children:
        dataChangeStatus.length !== 0 ? (
          dataChangeStatus?.map((item: any) => (
            <StyleOrder>
              <StyleContentOrder onClick={() => showModal(item?.id)}>
                <StyleContentTitle>{item?.name}</StyleContentTitle>
                <StyleContentDetails>
                  mô tả: {item?.description}
                </StyleContentDetails>
                <StyleContentSender>
                  người gửi: {item?.senderName}
                </StyleContentSender>
              </StyleContentOrder>
              {profile?.role === "shipper" ? (
                <StyleButton
                  onClick={() =>
                    handleChangeStatus(
                      item?.id,
                      item?.status === "WAITING" ? "SHIPPING" : null
                    )
                  }
                >
                  Nhận đơn hàng
                </StyleButton>
              ) : profile?.role === "user" ? (
                <StyleButton
                  onClick={() =>
                    handleChangeStatus(
                      item?.id,
                      item?.status === "WAITING" ? "CANCEL" : null
                    )
                  }
                >
                  Hủy đơn hàng
                </StyleButton>
              ) : null}
            </StyleOrder>
          ))
        ) : (
          <StyleEmptyOrder>
            <img src={empty} alt="empty order" width={400} height={400} />
            <StyleTitleEmpty>Không có đơn hàng hiển thị</StyleTitleEmpty>
          </StyleEmptyOrder>
        ),
    },
    {
      key: "SHIPPING",
      label:
        profile?.role === "user"
          ? `Đơn đang giao (${filterCountShipping.length})`
          : `Đơn đang giao (${filterCountShipping.length})`,
      children:
        dataChangeStatus.length !== 0 ? (
          dataChangeStatus?.map((item: any) => (
            <StyleOrder>
              <StyleContentOrder onClick={() => showModal(item?.id)}>
                <StyleContentTitle>{item?.name}</StyleContentTitle>
                <StyleContentDetails>
                  mô tả: {item?.description}
                </StyleContentDetails>
                <StyleContentSender>
                  người gửi: {item?.senderName}
                </StyleContentSender>
              </StyleContentOrder>
              {profile?.role === "user" ? (
                <StyleButton
                  onClick={() =>
                    handleChangeStatus(
                      item?.id,
                      item?.status === "SHIPPING" ? "DONE" : null
                    )
                  }
                >
                  Đã nhận hàng
                </StyleButton>
              ) : null}
            </StyleOrder>
          ))
        ) : (
          <StyleEmptyOrder>
            <img src={empty} alt="empty order" width={400} height={400} />
            <StyleTitleEmpty>Không có đơn hàng hiển thị</StyleTitleEmpty>
          </StyleEmptyOrder>
        ),
    },
    {
      key: "DONE",
      label:
        profile?.role === "user"
          ? `Đơn hoàn thành (${filterCountDone.length})`
          : `Đơn đã giao (${filterCountDone.length})`,
      children:
        dataChangeStatus.length !== 0 ? (
          dataChangeStatus?.map((item: any) => (
            <StyleOrder>
              <StyleContentOrder onClick={() => showModal(item?.id)}>
                <StyleContentTitle>{item?.name}</StyleContentTitle>
                <StyleContentDetails>
                  mô tả: {item?.description}
                </StyleContentDetails>
                <StyleContentSender>
                  người gửi: {item?.senderName}
                </StyleContentSender>
              </StyleContentOrder>
            </StyleOrder>
          ))
        ) : (
          <StyleEmptyOrder>
            <img src={empty} alt="empty order" width={400} height={400} />
            <StyleTitleEmpty>Không có đơn hàng hiển thị</StyleTitleEmpty>
          </StyleEmptyOrder>
        ),
    },
    profile?.role === "user"
      ? {
          key: "CANCEL",
          label: `Đơn đã hủy (${filterCountCancel.length})`,
          children:
            dataChangeStatus.length !== 0 ? (
              dataChangeStatus?.map((item: any) => (
                <StyleOrder>
                  <StyleContentOrder onClick={() => showModal(item?.id)}>
                    <StyleContentTitle>{item?.name}</StyleContentTitle>
                    <StyleContentDetails>
                      mô tả: {item?.description}
                    </StyleContentDetails>
                    <StyleContentSender>
                      người gửi: {item?.senderName}
                    </StyleContentSender>
                  </StyleContentOrder>
                </StyleOrder>
              ))
            ) : (
              <StyleEmptyOrder>
                <img src={empty} alt="empty order" width={400} height={400} />
                <StyleTitleEmpty>Không có đơn hàng hiển thị</StyleTitleEmpty>
              </StyleEmptyOrder>
            ),
        }
      : null,
  ];

  return (
    <StyleContainer>
      <StyleInfo>
        <StyleTitle>Trạng thái đơn hàng</StyleTitle>
        <StyleDes>
          Trạng thái giao hàng liên quan đến việc vận chuyển của đơn hàng
        </StyleDes>
      </StyleInfo>
      {isCheckError ? (
        <StyleErrorPopup>
          <Alert
            message="Không thể nhận đơn hàng"
            description="Bạn đang có đơn hàng ở trạng thái đang giao nên không thể nhận đơn hàng này được!"
            type="error"
            showIcon
            action={
              <Button size="small" onClick={() => setIsCheckError(false)}>
                Đóng
              </Button>
            }
          />
        </StyleErrorPopup>
      ) : null}
      {isCheckVerify ? (
        <StyleErrorPopup>
          <Alert
            message="Không thể nhận đơn hàng"
            description="Tài khoản của bạn chưa được xác thực nên không thể nhận đơn hàng này, vui lòng xác thực tài khoản"
            type="error"
            showIcon
            action={
              <Button size="small" onClick={() => setIsCheckVerify(false)}>
                Đóng
              </Button>
            }
          />
        </StyleErrorPopup>
      ) : null}
      <StyleContent>
        <Tabs size="large" items={items} onChange={onChange} />
      </StyleContent>
      <Modal
        centered
        title="CHI TIẾT GÓI HÀNG"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
      >
        <StyleModal>
          <StyleInfoUser>Thông tin gói hàng</StyleInfoUser>
          <StyleContentCenter>
            <StyleDetailSubTitle>
              Tên gói hàng:
              <StyleDetailTitle>{dataDetails?.name}</StyleDetailTitle>
            </StyleDetailSubTitle>
            <StyleDetailSubTitle>
              Khối lượng(kg):
              <StyleDetailTitle>{dataDetails?.productVolume}</StyleDetailTitle>
            </StyleDetailSubTitle>

            <StyleDetailSubTitle>
              Chi tiết gói hàng:
              <StyleDetailTitle>{dataDetails?.description}</StyleDetailTitle>
            </StyleDetailSubTitle>
            <StyleDetailSubTitle>
              Các loại tags
              <ul>
                {dataDetails?.tags?.map((item: any, index: number) => (
                  <StyleDetailTitle>
                    {index + 1}. {item?.name}
                  </StyleDetailTitle>
                ))}
              </ul>
            </StyleDetailSubTitle>
          </StyleContentCenter>
          <StyleContentCenter>
            <StyleInfoUser>Thông tin người gửi</StyleInfoUser>
            <StyleDetailSubTitle>
              Họ và tên người gửi:
              <StyleDetailTitle>{dataDetails?.senderName}</StyleDetailTitle>
            </StyleDetailSubTitle>
            <StyleDetailSubTitle>
              SĐT người gửi:
              <StyleDetailTitle>{dataDetails?.senderPhone}</StyleDetailTitle>
            </StyleDetailSubTitle>
            <StyleDetailSubTitle>
              Địa chỉ người gửi:
              <StyleDetailTitle>{dataDetails?.senderAddress}</StyleDetailTitle>
            </StyleDetailSubTitle>
          </StyleContentCenter>
          <StyleContentCenter>
            <StyleInfoUser>Thông tin người nhận</StyleInfoUser>
            <StyleDetailSubTitle>
              Họ và tên người nhận:
              <StyleDetailTitle>{dataDetails?.receiverName}</StyleDetailTitle>
            </StyleDetailSubTitle>
            <StyleDetailSubTitle>
              SĐT người nhận:
              <StyleDetailTitle>{dataDetails?.receiverPhone}</StyleDetailTitle>
            </StyleDetailSubTitle>
            <StyleDetailSubTitle>
              Địa chỉ người nhận:
              <StyleDetailTitle>
                {dataDetails?.receiverAddress}
              </StyleDetailTitle>
            </StyleDetailSubTitle>
          </StyleContentCenter>
        </StyleModal>
      </Modal>
    </StyleContainer>
  );
};

export default StatusOrder;
