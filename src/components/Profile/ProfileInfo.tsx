import { ChangeEvent, useEffect, useState } from "react";
import API from "../../services/API";
import userAva from '../../imgs/user.png';
import { UserType } from "../../redux/reducers/profileReducer";

type ProfileInfoType = {
  authId: number | null
  profile: UserType
  status: string
  updateStatus: (status: string) => void
}

const ProfileInfo = (props: ProfileInfoType) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(props.status)

   useEffect(() => {
    setTitle(props.status)
    
  }, [props.status])

  const onDoubleClickHandler = () => setEditMode(!editMode)

  const onBlurHandler = () => {
    props.updateStatus(title)
    setEditMode(!editMode)
  }

  console.log(props.status);
  

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
  
  return (
    <div>
       <img src={`${props.profile ? props.profile.photos.large : userAva}`} alt='ava'/>
       
      <div> Status: {!editMode ? 
       <span onDoubleClick={onDoubleClickHandler}>{title}</span>
      : <input type='text' value={title} onChange={onStatusChange} onBlur={onBlurHandler}/>} 
    </div>
    </div>
  );
};

export default ProfileInfo;
