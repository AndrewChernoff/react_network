import { ChangeEvent, useState } from "react";
import { connect } from "react-redux";
import Messages from "./Messages";
import {
  DialogType,
    MessageType,
    sendMessage,
  } from "../../redux/reducers/messagesReducer";
import { Dispatch } from "redux";
import { AppState } from "../../redux/reducers";


  type DialogsProps = {
    dialogs: DialogType[]
    messages: MessageType[]
    sendMessage: (obj: MessageType) => void
  }

  //type MessagesPropsType = MapStateType | MapDispatchType

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

type MapStateType = {
    dialogs: DialogType[]
    messages: MessageType[]
  };
  
  const mapState = (state: AppState): MapStateType => ({
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
  });

type MapDispatchType = {
  sendMessage: (obj: MessageType) => void
}
  
  const mapDispatch = (dispatch: Dispatch): MapDispatchType => {
    return {
      sendMessage: (obj: MessageType) =>  {
        dispatch(sendMessage(obj))
      }};
  };
  
  const connector = connect(mapState, mapDispatch);

export default connector(MessagesContainer)