const SEND_MESSAGE = "SEND_MESSAGE"

type Action = {
  payload?: any;
  type: string;
};

export type MessageType = {
  id: number
  message: string
}
export type DialogType = {
  id: number
  name: string
}

export type DialogsState = {
    dialogs: DialogType[]
    messages: MessageType[]
};

const initialState: DialogsState = {

    dialogs: [
        {
            id: 1,
            name: "Mark",
          },
          {
            id: 2,
            name: "Alex",
          },
          {
            id: 3,
            name: "Mike",
          },
          {
            id: 4,
            name: "Jess",
          },
    ]
    
    ,
  messages: [
  { id: 1, message: "hey" },
  { id: 2, message: "yo" },
  { id: 3, message: "sup", },
  ]
};

const disalogsReducer = (state = initialState, action: Action): DialogsState | undefined => {
    switch (action.type) {
    case SEND_MESSAGE:
      return { ...state, messages: [...state.messages,  action.payload] };

    default:
      return state;
  }
};

export const sendMessage = (payload: MessageType) => ({type: SEND_MESSAGE, payload})

export default disalogsReducer;
