import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "cf030fe2-6f9a-49e8-86a7-893fb44b9868",
  },
});

const API = {
  getUsers: async (pageSize: number, currentPage: number) => {
    const { data } = await instance.get(
      `users?count=${pageSize}&page=${currentPage}`
    );
    return await data;
  },

  follow: async(userId: number) => {
    const res = await instance.post(`follow/${userId}`)
    return res
  },

  unfollow: async(userId: number) => {
    const res = await instance.delete(`follow/${userId}`)
    return res
  },

  authMe: async() => {
    const {data} = await instance.get(`auth/me`)
    return await data
  }, 
};

export default API