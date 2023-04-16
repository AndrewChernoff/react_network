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

const ProfileInfo = ({authId, profile, status, updateStatus, updateUserInfo, error, setError}: ProfileInfoType) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [editInfo, setEditInfo] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(status)

   useEffect(() => {
    setTitle(status)
  }, [status])

  useEffect(() => {

    return () => {
      console.log('unmount');
      setError(null)
    }
  }, [])

  const onDoubleClickHandler = () => setEditMode(!editMode)

  const onBlurHandler = () => {
    updateStatus(title)
    setEditMode(!editMode)
  }

  const setEditInfoMode = () => setEditInfo(!editInfo)

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
  
  return (
    <div>
       <img src={`${profile ? profile.photos.large : userAva}`} alt='ava'/>
       
      <div> Status: {!editMode ? 
       <span onDoubleClick={onDoubleClickHandler}>{title}</span>
      : <input type='text' value={title} onChange={onStatusChange} onBlur={onBlurHandler}/>} 
    </div>
    <div>
    {!editInfo ? <div className={s.info}>
      <h2>Main info</h2>
      <ul className={s.infoContent}>
      <li>
      Full name: {profile?.fullName}
      </li>
      <li>
      About me: {profile?.aboutMe}
      </li>
      <li>
      Looking for a job: {profile?.lookingForAJob ? 'yes' : ' no'}
      </li>
      <li>
      Looking for a job description: {profile?.lookingForAJobDescription}
      </li>
    </ul>
    <div className={s.contacts}>
      <h3> Contacts:</h3>
    <ul>
        {profile && Object.keys(profile.contacts).map(key => {
          return <li>{key}: {profile.contacts[key] || '--'}</li>
        })}
      </ul>
    </div>
    {authId === profile?.userId && <button onClick={() => setEditInfo(!editInfo)}>Edit info</button>}

    </div>
    : <ProfileFormInfo 
      setEditInfo={setEditInfoMode}
       profile={profile} 
       updateUserInfo={updateUserInfo}/>
      }
      </div>
      {error && <div className={s.errorMessage}>{error}</div>}
    </div>
  );
};



export default ProfileInfo;
