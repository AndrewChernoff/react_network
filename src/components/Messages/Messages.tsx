import { Field, Formik, Form, FormikHelpers } from "formik";
import { NavLink } from "react-router-dom";
import FormControl from "../../common/FormControl/FormControl";
import {
  MessageType
} from "../../redux/reducers/messagesReducer";
import s from "./Messages.module.scss";

type DialogsProps = {
  dialogs: any[]
  messages: MessageType[]
  onSendClick: (message: string) => void
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
          {/* <textarea value={props.message} onChange={props.onChangeHandler} className={s.dialogs__item__textarea} />
          <button onClick={props.onSendClick}>Send message</button> */}
          <AddPostItemFrom callback={props.onSendClick}/>
        </div>
      </div>
      </div>
   
  );
};


interface Values {
  message: string;
}

type AddPostItemFromType = {
  callback: (value: string) => void
}

const AddPostItemFrom = ({callback}: AddPostItemFromType) => {

  const validateFormItem = (value: string) => {
    let error;
   if (value.length >= 30) {
     error = 'Should be less then 20';
   }
   return error;
  }

  return <Formik
  initialValues={{
    message: '',
  }}
  onSubmit={(
    values: Values,
    { resetForm }: FormikHelpers<Values>
  ) => {
    callback(values.message)
    resetForm()
  }}
>
{({ errors }) => (<Form>
    <FormControl varlidationCallback={validateFormItem} 
    componentType={'textarea'} placeholder={'Type your message'} name={'message'} type={'text'} className={errors.message? s.errorTextarea : ''}/>
    {errors.message && <div className={s.errorBlock}>{errors.message}</div>}

    <button type="submit" disabled={errors.message ? true : false}>Send</button>
  </Form>
  )}
</Formik>
}

export default Messages;
