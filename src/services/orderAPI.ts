import axiosClient from "../utils/axios";

const orderAPI = {
  getOrders: () => {
    const url = `/orders`;
    return axiosClient.get(url);
  },
  createOrder: (data: any) => {
    const url = `/orders`;
    return axiosClient.post(url, data);
  },
};

export default orderAPI;
