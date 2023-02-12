const GET_USERS = 'GET_USERS';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

type GetUsersType = ReturnType<typeof getUsersAC>
type SetTotalCountType = ReturnType<typeof setTotalCountAC>
type SetCurrentPageType = ReturnType<typeof setCurrentPageAC>

type ActionType = GetUsersType | SetTotalCountType | SetCurrentPageType

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
  totalCount: number
  currentPage: number
  pageSize: number
}

const initialState: StateType = {
    users: [],
    totalCount: 0,
    currentPage: 1,
    pageSize: 5
}

export const usersReducer = (state=initialState, action: ActionType) => {
    switch (action.type) {
        case GET_USERS:
          return {...state, users: action.payload}
        case SET_TOTAL_COUNT:
          return {...state, totalCount: action.payload}
        case SET_CURRENT_PAGE:
          return {...state, currentPage: action.payload}
    
        default:
          return state;
      }
}

export const getUsersAC = (payload: UsersType[]) => ({type: GET_USERS, payload}) as const
export const setTotalCountAC = (payload: number) => ({type: SET_TOTAL_COUNT, payload}) as const
export const setCurrentPageAC = (payload: number) => ({type: SET_CURRENT_PAGE, payload}) as const

export default usersReducer