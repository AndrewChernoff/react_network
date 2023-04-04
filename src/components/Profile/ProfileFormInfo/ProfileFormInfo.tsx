import { Field, Form, Formik } from "formik";
import { UserType } from "../../../redux/reducers/profileReducer";
import s from './ProfileFormInfo.module.scss'

export type UserContactValues = {
  fullName: string | null
  aboutMe: string | null
  lookingForAJobDescription: boolean //?
  lookingForAJob: any
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
  console.log(profile);
  

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
           actions.setSubmitting(false);
           setEditInfo()
         }}
       >
        <Form className={s.formInfo}>
            <label htmlFor="fullName">Full name</label>
           <Field id="fullName" name="fullName" placeholder="" />
    
           <label htmlFor="aboutMe">About me</label>
           <Field id="aboutMe" name="aboutMe" placeholder="" />

            <label htmlFor="lookingForAJob">Looking for a job</label>
            <Field id="lookingForAJob" name="lookingForAJob" type="checkbox" placeholder="" />
        
            <label htmlFor="lookingForAJobDescription">Looking for a job description</label>
            <Field id="lookingForAJobDescription" name="lookingForAJobDescription" type="text" placeholder="" />

             {profile.contacts && 
                Object.keys(profile.contacts).map((_,i) => {
                    const contactName = Object.keys(profile.contacts)[i]
                 return <li>{contactName}:<Field id={`contacts.${contactName}`} name={`contacts.${contactName}`} placeholder="" /></li>
                    
                })}
            <button type="submit">Submit</button>
            <button onClick={setEditInfo}>Cancel</button>
        </Form>

         
       </Formik>
     </div>
    )
  }

export default ProfileFormInfo