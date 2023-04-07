import { ChangeEvent, useEffect, useState } from "react";
import userAva from '../../imgs/user.png';
import { UserType } from "../../redux/reducers/profileReducer";
import s from "./ProfileInfo.module.scss";
import ProfileFormInfo, { UserContactValues } from "./ProfileFormInfo/ProfileFormInfo";

type ProfileInfoType = {
  authId: number | null
  profile: UserType
  status: string
  updateStatus: (status: string) => void
  updateUserInfo: (info: UserContactValues) => void
  error: string | null
  setError: (message: string | null) => void
}

const ProfileInfo = (props: ProfileInfoType) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [editInfo, setEditInfo] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(props.status)

   useEffect(() => {
    setTitle(props.status)
  }, [props.status])

  useEffect(() => {

    return () => {
      console.log('unmount');
      props.setError(null)
    }
  }, [])

  //props.error && alert(props.error) ////the problem is that i need to make changing only on autherized profile in show an error only in editMode

  const onDoubleClickHandler = () => setEditMode(!editMode)

  const onBlurHandler = () => {
    props.updateStatus(title)
    setEditMode(!editMode)
  }

  const setEditInfoMode = () => setEditInfo(!editInfo)

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
  
  return (
    <div>
       <img src={`${props.profile ? props.profile.photos.large : userAva}`} alt='ava'/>
       
      <div> Status: {!editMode ? 
       <span onDoubleClick={onDoubleClickHandler}>{title}</span>
      : <input type='text' value={title} onChange={onStatusChange} onBlur={onBlurHandler}/>} 
    </div>
    <div>
    {!editInfo ? <div className={s.info}>
      <h2>Main info</h2>
      <ul className={s.infoContent}>
      <li>
      Full name: {props.profile?.fullName}
      </li>
      <li>
      About me: {props.profile?.aboutMe}
      </li>
      <li>
      Looking for a job: {props.profile?.lookingForAJob ? 'yes' : ' no'}
      </li>
      <li>
      Looking for a job description: {props.profile?.lookingForAJobDescription}
      </li>
    </ul>
    <div className={s.contacts}>
      <h3> Contacts:</h3>
    <ul>
        {props.profile && Object.keys(props.profile.contacts).map(key => {
          return <li>{key}: {props.profile.contacts[key] || '--'}</li>
        })}
      </ul>
    </div>
    <button onClick={() => setEditInfo(!editInfo)}>Edit info</button>

    </div>
    : <ProfileFormInfo 
      setEditInfo={setEditInfoMode}
       profile={props.profile} 
       updateUserInfo={props.updateUserInfo}/>
      }
      </div>
      {props.error && <div className={s.errorMessage}>{props.error}</div>}
    </div>
  );
};



export default ProfileInfo;
