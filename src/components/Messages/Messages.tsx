import { ChangeEvent, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  DialogType,
  MessageType,
  sendMessage,
} from "../../redux/reducers/messagesReducer";
import s from "./Messages.module.scss";

/* interface Dialog {
  id: number;
  name: string;
} */

type DialogsProps = {
  dialogs: any[]
  messages: MessageType[]
  message: string
  onSendClick: () => void
  onChangeHandler: (e: any) => void
}

const Messages = (props: DialogsProps) => {

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
        <div className={s.dialogs__item}> 
          <textarea value={props.message} onChange={props.onChangeHandler} className={s.dialogs__item__textarea} />
          <button onClick={props.onSendClick}>Send message</button>
        </div>
      </div>
      </div>
   
  );
};

export default Messages;
