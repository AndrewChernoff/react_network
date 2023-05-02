import axios from "axios";
import { UsersType } from "../redux/reducers/usersReducer";
import { LoginValues } from "../components/Login/Login";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "cf030fe2-6f9a-49e8-86a7-893fb44b9868",
  },
});


type GetUsersType = {
  error: unknown
  items: UsersType[]
  totalCount: number
};

export type UserInfoType = {
  aboutMe: string
  contacts: {
    [key: string]: string
  }
  fullName: string
  lookingForAJob: boolean
  lookingForAJobDescription: boolean
  photos: {
    small: string
    large: string
  }
  userId: number
}

type AuthDataType =  {
    id: number,
    email: string,
    login: string
  }

type DataType<T> = {
  data: T
  fieldsErrors: string[]
  messages: string[]
  resultCode: number
}

export type UserContactValues = {
  fullName: string | null
  aboutMe: string | null
  lookingForAJobDescription: boolean //?
  lookingForAJob: boolean //?
  contacts: {
    [key:string]: string | null
  }
}

const API = {
  getUsers: async (pageSize: number, currentPage: number) => {
    return instance.get<GetUsersType>(
      `users?count=${pageSize}&page=${currentPage}`
    ).then(res => {
      console.log(res);
      
      return  res.data
    })
  },

  follow: async(userId: number) => {
    return instance.post<DataType<{}>>(`follow/${userId}`)
     .then(res =>  res.data)
  },

  unfollow: async(userId: number) => {
    return instance.delete<DataType<{}>>(`follow/${userId}`)
    .then(res => res.data)
  },

  authMe: () => {
    return instance.get<DataType<AuthDataType>>(`auth/me`)
      .then(res =>  res.data)
  },
  
  getProfile: (userId: number) => {
    return instance.get<UserInfoType>(
      `profile/${userId}`
    ).then(res =>  res.data)
  },

  getStatus: (userId: number) => {
    return instance.get<string>(
      `profile/status/${userId}`
    )
    .then(res => res.data)
  },

  updateStatus: (status: string) => {
    return instance.put<DataType<any>>(
      `profile/status`, {status}
    )
    .then(res => res.data)
  },

  login: (obj: LoginValues) => {///
    return instance.post<DataType<{userId: number}>>(
      `auth/login`, obj
    )
    .then(res => res.data)
    
  },

  logout: () => {
    return  instance.delete<DataType<{}>>(`auth/login`)
      .then(res => res.data)
  },
  updateInfo: (info: UserContactValues) => {
    return instance.put<DataType<{}>>(
      `profile`, info
    )
    .then(res => res.data)
  },
  updatePhoto: (image: File) => {
    
    const formData = new FormData();
    formData.append('file', image);
    
    return instance.put<DataType<{photos: {small: string, large:string}}>>(
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
    return instance.get<{url:string}>('security/get-captcha-url')
      .then(res => {      
        return  res.data
      })
  }
};

export default API