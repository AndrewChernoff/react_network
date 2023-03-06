import { ChangeEvent, ComponentType, useState } from "react";
import { connect } from "react-redux";
import Messages from "./Messages";
import { DialogType, MessageType, sendMessage,} from "../../redux/reducers/messagesReducer";
import { compose, Dispatch } from "redux";
import { AppState } from "../../redux/reducers";
import { Navigate } from "react-router-dom";
import { withAuthRedirect } from "../../HOC/WithAuthRedirect";

type MessagesPropsType = MapStateType & MapDispatchType

const MessagesContainer = (props: MessagesPropsType) => {
  const [message, setMessage] = useState('')
  
  const onSendClick = () => {
    props.sendMessage({id: 5, message: message})
    setMessage('');
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  setMessage(e.currentTarget.value)
  }
  
  //if(props.isAuth === false) return <Navigate to='/login'/>

  return <Messages onSendClick={onSendClick} message={message} messages={props.messages} dialogs={props.dialogs} onChangeHandler={onChangeHandler}/>
}

type MapStateType = {
    dialogs: DialogType[]
    messages: MessageType[]
    //isAuth: boolean
  };
  
  const mapState = (state: AppState): MapStateType => ({
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
    //isAuth: state.auth.isAuth
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
  
  /* const connector = connect(mapState, mapDispatch);

export default connector(withAuthRedirect(MessagesContainer)) */

export default compose<ComponentType>(
  connect(mapState, mapDispatch),
  withAuthRedirect
  )(MessagesContainer)