import axiosClient from "../utils/axios";

export const addressAPI = {
  //   getOrderStatus: (status: string) => {
  //     const url = `/orders?status=${status}`;
  //     return axiosClient.get(url);
  //   },
  getProvince: () => {
    const url = `/address/province`;
    return axiosClient.get(url);
  },
  getDistrictById: (id: number) => {
    const url = `/address/district/${id}`;
    return axiosClient.get(url);
  },
  getWardById: (id: number) => {
    const url = `/address/ward/${id}`;
    return axiosClient.get(url);
  },
};
