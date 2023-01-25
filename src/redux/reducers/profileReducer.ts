const ADD_POST = "ADD_POST"

type Action = {
  payload?: any;
  type: string;
};

export type PostsType = {
  id: number
  message: string
  likes: number
}

export type ProfileState = {
    posts: PostsType[]
};

const initialState: ProfileState = {
  posts: [
  { id: 1, message: "hey", likes: 5 },
  { id: 2, message: "yo", likes: 3 },
  { id: 3, message: "sup", likes: 15 },
  ]
};

const profileReducer = (state = initialState, action: Action): ProfileState  => {
  switch (action.type) {
    case ADD_POST:
      return { ...state, posts: [...state.posts,  action.payload] };

    default:
      return state;
  }
};

export const addPost = (payload: PostsType) => ({type: ADD_POST, payload})

export default profileReducer;
