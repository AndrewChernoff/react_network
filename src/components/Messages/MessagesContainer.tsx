import { ChangeEvent, ComponentType, useState } from "react";
import { connect } from "react-redux";
import Messages from "./Messages";
import { DialogType, MessageType, sendMessage,} from "../../redux/reducers/messagesReducer";
import { compose, Dispatch } from "redux";
import { AppState } from "../../redux/reducers";
import { withAuthRedirect } from "../../HOC/WithAuthRedirect";

type MessagesPropsType = MapStateType & MapDispatchType

const MessagesContainer = (props: MessagesPropsType) => {
  
  const onSendClick = (message: string) => {
    props.sendMessage({id: 5, message: message})
  }
  
  return <Messages onSendClick={onSendClick} messages={props.messages} dialogs={props.dialogs} /* onChangeHandler={onChangeHandler} *//>
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

export default compose<ComponentType>(
  connect(mapState, mapDispatch),
  withAuthRedirect
  )(MessagesContainer)