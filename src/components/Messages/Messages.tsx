import { useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  MessageType,
  sendMessage,
} from "../../redux/reducers/messagesReducer";
import s from "./Messages.module.scss";

interface Dialog {
  id: number;
  name: string;
}

const Messages = (props: DialogsProps) => {



  const [message, setMessage] = useState('')
  
  const onSendClick = () => {
    props.sendMessage({id: (props.messages.length + 1), message: message})
    setMessage('');
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogs__items}>
        {props.dialogs.map((el) => {
          return (
            <NavLink
              key={el.id}
              to={`${el.id}`}
              state={{ userName: el.name }}
              className={s.dialogs__item}
            >
              {el.name}
            </NavLink>
          );
        })}
      </div>

      <div className={s.dialogs__messages}>
        {props.messages.map(({message, id}) => {
          return  <div className={s.dialogs__item} key={id}>{message}</div>
        })}
       {/*  <div className={s.dialogs__item}>wassup bro</div>
        <div className={s.dialogs__item}>how is it going?</div>
        <div className={s.dialogs__item}>see u</div>*/}
        <div className={s.dialogs__item}> 
          <textarea value={message} onChange={(e) => setMessage(e.currentTarget.value)} className={s.dialogs__item__textarea} />
          <button onClick={onSendClick}>Send message</button>
        </div>
      </div>
      </div>
   
  );
};

type Dialogs = {
  dialogs: Dialog[]
  messages: MessageType[]
};

type DialogsProps = {
  dialogs: Dialog[]
  messages: MessageType[]
  sendMessage: (obj: MessageType) => void
}

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

export default connector(Messages);
