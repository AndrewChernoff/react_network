import { Form, Formik, FormikHelpers } from "formik";
import FormControl from "../../common/FormControl/FormControl";
import { PostsType, UserType } from "../../redux/reducers/profileReducer";
import PostItem from "../PostItem/PostItem";
import s from "./Profile.module.scss";
import ProfileInfo from "./ProfileInfo";
import { UserContactValues } from "./ProfileFormInfo/ProfileFormInfo";

 type ProfileProps = {
  posts: PostsType[],
  onAddPostClick: (value: string) => void
  authId: number | null
  profile: UserType
  status: string
  updateStatus: (status: string) => void
  updateUserInfo: (info: UserContactValues) => void
  error: string | null
  setError: (message: string | null) => void
}

const Profile = ({posts, onAddPostClick, authId, profile, status, updateStatus, updateUserInfo, error, setError}: ProfileProps) => {

  return (
    <div className={s.profile}>
      <div className={s.profile__container}>
        <ProfileInfo authId={authId} profile={profile} status={status}
        updateStatus={updateStatus}
        updateUserInfo={updateUserInfo}
        setError={setError}
        error={error}
        />

        <div className={s.profile__post}>
          <AddPostItemFrom callback={onAddPostClick}/>
        </div>
        {
            posts.map((el) => {
                return <PostItem key={el.id} message={el.message} likes={el.likes}/>
            })
        }
      </div>
    </div>
  );
};
//////
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
    <FormControl validationCallback={validateFormItem} 
    componentType={'textarea'} placeholder={'Type your post'} name={'postValue'} type={'text'} className={errors.postValue? s.errorTextarea : ''}/>
    {errors.postValue && <div className={s.errorBlock}>{errors.postValue}</div>}

    <button type="submit" disabled={errors.postValue ? true : false}>Add post</button>
  </Form>
)}
</Formik>
}

export default Profile;