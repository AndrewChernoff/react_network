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
    return instance.get(
      `users?count=${pageSize}&page=${currentPage}`
    ).then(res => res.data)
  },

  follow: async(userId: number) => {
    return instance.post(`follow/${userId}`)
     .then(res => res.data)
  },

  unfollow: async(userId: number) => {
    return instance.delete(`follow/${userId}`)
    .then(res => res.data)
  },

  authMe: () => {
    return instance.get(`auth/me`)
      .then(res => res.data)
  },
  
  getProfile: async(userId: number) => {
    const {data} = await instance.get(
      `profile/${userId}`
    )
    return await data
  },

  getStatus: (userId: number) => {
    return instance.get(
      `profile/status/${userId}`
    )
    .then(res => res.data)
  },

  updateStatus: (status: string) => {
    return instance.put(
      `profile/status`, {status}
    )
    .then(res => res.data)
    
  },

  login: (obj: any) => {
    return instance.post(
      `auth/login`, obj
    )
    .then(res => res.data)
    
  },

  logout: () => {
    return  instance.delete(`auth/login`)
      .then(res => res.data)
  },
  updateInfo: (info: any) => {
    return instance.put(
      `profile`, info
    )
    .then(res => res.data)
  },
  updatePhoto: (image: File) => {
    
    const formData = new FormData();
    formData.append('file', image);
    
    return instance.put(
      `/profile/photo
      `, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      } 
    )
    .then(res => res.data)
  },

  getCaptcha:() => {
    return instance.get('security/get-captcha-url')
      .then(res => res.data)
  }
};


export default API