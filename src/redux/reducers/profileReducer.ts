const ADD_POST = "ADD_POST"
const SET_USER = "SET_USER"

type AddPostType = ReturnType<typeof addPost>
type SetUserType = ReturnType<typeof setUserAC>

type ActionType = AddPostType | SetUserType


export type PostsType = {
  id: number
  message: string
  likes: number
}

export type UserType = {
  aboutMe: string |null
  contacts: {
    [key: string]: string | null
  }
  fullName: string | null
  lookingForAJobDescription: boolean
  photos: {
    small: string | null
    large: string | null
  }
  userId: number
}

export type ProfileState = {
    posts: PostsType[],
    user: any 
}

const initialState: ProfileState = {
  posts: [
  { id: 1, message: "hey", likes: 5 },
  { id: 2, message: "yo", likes: 3 },
  { id: 3, message: "sup", likes: 15 },
  ],
  user: null
};

const profileReducer = (state = initialState, action: ActionType): ProfileState  => {
  switch (action.type) {
    case ADD_POST:
      return { ...state, posts: [action.payload, ...state.posts] };
    case SET_USER:
      return { ...state, user: action.user };

    default:
      return state;
  }
};

export const addPost = (payload: PostsType) => ({type: ADD_POST, payload}) as const
export const setUserAC = (user: PostsType) => ({type: SET_USER, user}) as const

export default profileReducer;
