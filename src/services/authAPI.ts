import axiosClient from "../utils/axios";

const authAPI = {
  login: (data: any) => {
    const url = `/auth/login`;
    return axiosClient.post(url, data);
  },
  register: (data: any) => {
    const url = `/auth/signup`;
    return axiosClient.post(url, data);
  },
};

export default authAPI;
