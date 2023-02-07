const GET_USERS = 'GET_USERS';

type GetUsersType = ReturnType<typeof getUsersAC>

type ActionType = GetUsersType

export type UsersType = {
    name: string,
    id: number,
    uniqueUrlName: null,
    photos: {
      small: null,
      large: null
    },
    status: null,
    followed: false
}

type StateType = {
  users: UsersType[]
}

const initialState: StateType = {
    users: []
}

export const usersReducer = (state=initialState, action: ActionType) => {
    switch (action.type) {
        case GET_USERS:
          return {...state, users: [...state.users, ...action.payload]}
    
        default:
          return state;
      }
}

export const getUsersAC = (payload: UsersType[]) => ({type: GET_USERS, payload}) as const

export default usersReducer