import { Field, Form, Formik, FormikHelpers } from "formik";
import { FormEvent, useState } from "react";
import FormControl from "../../common/FormControl/FormControl";
import { PostsType, UserType } from "../../redux/reducers/profileReducer";
import PostItem from "../PostItem/PostItem";
import s from "./Profile.module.scss";
import ProfileInfo from "./ProfileInfo";

 type ProfileProps = {
  posts: PostsType[],
  onAddPostClick: (value: string) => void
  authId: number | null
  profile: UserType
  status: string
  updateStatus: (status: string) => void
}

const Profile = (props: ProfileProps) => {

  return (
    <div className={s.profile}>
      <div className={s.profile__container}>
        <ProfileInfo authId={props.authId} profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>

        <div className={s.profile__post}>
          <AddPostItemFrom callback={props.onAddPostClick}/>
        </div>
        {
            props.posts.map((el) => {
                return <PostItem key={el.id} message={el.message} likes={el.likes}/>
            })
        }
      </div>
    </div>
  );
};

interface Values {
  postValue: string;
}

type AddPostItemFromType = {
  callback: (value: string) => void
}

const AddPostItemFrom = ({callback}: AddPostItemFromType) => {

  const validateFormItem = (value: string) => {
    let error;
   if (value.length >= 30) {
     error = 'Should be less then 30';
   }
   return error;
  }

  return <Formik
  initialValues={{
    postValue: '',
  }}
  onSubmit={(
    values: Values,
    { resetForm }: FormikHelpers<Values>
  ) => {
    callback(values.postValue)
    resetForm()
  }}
 >

{({ errors }) => (
  <Form>
   {/*  <Field
      name="postValue"
      placeholder="Type your post"
      type="text"
      component='textarea'
      validate={validateFormItem}
    /> */}
    <FormControl varlidationCallback={validateFormItem} 
    componentType={'textarea'} placeholder={'Type your post'} name={'postValue'}/>
    {errors.postValue && <div>{errors.postValue}</div>}

    <button type="submit" disabled={errors.postValue ? true : false}>Add post</button>
  </Form>
)}
</Formik>
}

export default Profile;