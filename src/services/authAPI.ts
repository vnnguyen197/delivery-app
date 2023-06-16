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
  sendOTP: (data: any)=>{
    const url = `/auth/send-otp`;
    return axiosClient.post(url, data);
  },
  verifyOTP: (data: any)=>{
    const url = `/auth/verify-otp`;
    return axiosClient.post(url, data);
  },
  changePassword: (data: any)=>{
    const url = `/auth/change-password`;
    return axiosClient.post(url, data);
  },
};

export default authAPI;
