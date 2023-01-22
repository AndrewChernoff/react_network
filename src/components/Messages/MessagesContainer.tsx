import { ChangeEvent, useState } from "react";
import { connect } from "react-redux";
import Messages from "./Messages";
import {
    MessageType,
    sendMessage,
  } from "../../redux/reducers/messagesReducer";


  type DialogsProps = {
    dialogs: Dialogs[]
    messages: MessageType[]
    sendMessage: (obj: MessageType) => void
  }

const MessagesContainer = (props: DialogsProps) => {
    const [message, setMessage] = useState('')
  
  const onSendClick = () => {
    props.sendMessage({id: 5, message: message})
    setMessage('');
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  setMessage(e.currentTarget.value)
}
  return <Messages onSendClick={onSendClick} message={message} messages={props.messages} dialogs={props.dialogs} onChangeHandler={onChangeHandler}/>
}


type Dialogs = {
    dialogs: Dialogs[]
    messages: MessageType[]
  };
  
  type RootState = {
    dialogsPage: Dialogs;
  };
  
  const mapState = (state: RootState) => ({
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
  });
  
  const mapDispatch = (dispatch: any) => {
    return { 
      sendMessage: (obj: MessageType) =>  {
        dispatch(sendMessage(obj))
      }
      };
  };
  
  const connector = connect(mapState, mapDispatch);

export default connector(MessagesContainer)