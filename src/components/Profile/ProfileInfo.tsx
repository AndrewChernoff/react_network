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
  uploadPhoto: (image: File) => void
}

const ProfileInfo = ({authId, profile, status, updateStatus, updateUserInfo, error, setError, uploadPhoto}: ProfileInfoType) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [editInfo, setEditInfo] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(status)

   useEffect(() => {
    setTitle(status)
    return () => {
      error && setError(null)
    }
  }, [status])

  const isOwner = (authId === profile?.userId)

  const onDoubleClickHandler = () => {
    if(!(authId === profile?.userId)) {
      return
    } 
    setEditMode(!editMode)
  }

  const onBlurHandler = () => {
    updateStatus(title)
    setEditMode(!editMode)
  }

  const setEditInfoMode = () => setEditInfo(!editInfo)

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
  
  const uploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      uploadPhoto(e.target.files[0])
    }
  }

  return (
    <div>
       <img src={`${profile ? profile.photos.large : userAva}`} alt='ava'/>

       <input type='file' onChange={uploadImg}/>
       
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
    {isOwner && <button onClick={() => setEditInfo(!editInfo)}>Edit info</button>}

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
