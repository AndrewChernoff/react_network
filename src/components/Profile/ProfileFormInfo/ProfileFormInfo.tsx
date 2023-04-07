import { Field, Form, Formik } from "formik";
import { UserType } from "../../../redux/reducers/profileReducer";
import s from './ProfileFormInfo.module.scss'
import FormControl from "../../../common/FormControl/FormControl";
import { useEffect } from "react";

export type UserContactValues = {
  fullName: string | null
  aboutMe: string | null
  lookingForAJobDescription: boolean //?
  lookingForAJob: boolean //?
  contacts: {
    [key:string]: string | null
  }
}

type ProfileFormInfoType = {
  profile: UserType
  updateUserInfo: (info: UserContactValues) => void
  setEditInfo: () => void
}

const ProfileFormInfo = ({profile, updateUserInfo, setEditInfo}:  ProfileFormInfoType) => {  

  const validateRequired = (value:string) => {
    let error;
    if (!value) {
      error = 'Required';
    }
    return error;
  };
  
      const initialValues: UserContactValues  = {
        fullName: profile.fullName,
        aboutMe: profile?.aboutMe,
        lookingForAJobDescription: profile?.lookingForAJobDescription,
        lookingForAJob: profile?.lookingForAJob,
        contacts: {
          github: profile.contacts.github,
          vk: profile.contacts.vk,
          facebook: profile.contacts.facebook,
          instagram: profile.contacts.instagram,
          twitter: profile.contacts.twitter,
          website: profile.contacts.website,
          youtube: profile.contacts.youtube,
          mainLink: profile.contacts.mainLink
        }
      };
       
   return (
     <div>
       <h1>Edit Info</h1>
       <Formik
         initialValues={initialValues}
         onSubmit={(values, actions) => {
           console.log(values);
          updateUserInfo(values);
            //actions.setSubmitting(false);
           setEditInfo()
         }}
       >
       {({ errors }) => ( <Form className={s.formInfo}>

           <FormControl validationCallback={validateRequired} id={"fullName"} componentType={"input"} name={"fullName"}type={"text"}/>
           {errors && <div>{errors.fullName}</div>}

          <FormControl validationCallback={validateRequired} id={"aboutMe"} componentType={"input"} name={"aboutMe"}type={"text"}/>
          {errors && <div>{errors.aboutMe}</div>}

          <FormControl id={"lookingForAJob"} componentType={"input"} name={"lookingForAJob"}type={"checkbox"}/>
        
        <FormControl validationCallback={validateRequired} id={"lookingForAJobDescription"} componentType={"input"} name={"lookingForAJobDescription"}type={"text"}/>
          {errors && <div>{errors.lookingForAJobDescription}</div>}
            
             {profile.contacts && 
                Object.keys(profile.contacts).map((_,i) => {
                    const contactName = Object.keys(profile.contacts)[i]
                 return <li>{contactName}:<Field id={`contacts.${contactName}`} name={`contacts.${contactName}`} /></li>
                })}
            <button type="submit">Submit</button>
            <button onClick={setEditInfo}>Cancel</button>
        </Form>
       )}
       </Formik>
       
     </div>
    )
  }

export default ProfileFormInfo