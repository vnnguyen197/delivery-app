import axiosClient from "../utils/axios";

const userAPI = {
  getUser: () => {
    const url = `/users/profile`;
    return axiosClient.get(url);
  },
  editUSer: (data: any) => {
    const url = `/users`;
    return axiosClient.patch(url, data);
  },
};

export default userAPI;
