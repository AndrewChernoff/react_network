import { Field, Form, Formik } from "formik";
import { UserType } from "../../../redux/reducers/profileReducer";
import s from './ProfileFormInfo.module.scss'
import FormControl from "../../../common/FormControl/FormControl";

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

  const validateRequired = (value:string) => {
    let error;
    if (!value) {
      error = 'Required';
    }
  
    return error;
  };

  const isValidUrl = (urlString: string)=> {
    let error;

    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
  //return !!urlPattern.test(urlString);

  if (!urlString) {
    error = 'Required';
  } else if (!urlPattern) {
    error = 'Invalid email address';
  }
}

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
           /* if(values.fullName) {
            validateFullName(values.fullName)
            updateUserInfo(values)
          } */
          updateUserInfo(values);
            actions.setSubmitting(false);
           setEditInfo()
         }}
       >
       {({ errors }) => ( <Form className={s.formInfo}>
           {/*  <label htmlFor="fullName">Full name</label>
           <Field id="fullName" name="fullName" /> */}
           <FormControl validationCallback={validateRequired} id={"fullName"} componentType={"input"} name={"fullName"}type={"text"}/>
           {errors && <div>{errors.fullName}</div>}
           
           {/* <label htmlFor="aboutMe">About me</label>
           <Field id="aboutMe" name="aboutMe" /> */}

          <FormControl validationCallback={validateRequired} id={"aboutMe"} componentType={"input"} name={"aboutMe"}type={"text"}/>
           {errors && <div>{errors.aboutMe}</div>}

            {/* <label htmlFor="lookingForAJob">Looking for a job</label>
            <Field id="lookingForAJob" name="lookingForAJob" type="checkbox" /> */}

          <FormControl /* validationCallback={validateRequired} */ id={"lookingForAJob"} componentType={"input"} name={"lookingForAJob"}type={"checkbox"}/>
           {/* {errors && <div>{errors.lookingForAJob}</div>} boolean type*/}
        
            {/* <label htmlFor="lookingForAJobDescription">Looking for a job description</label>
            <Field id="lookingForAJobDescription" name="lookingForAJobDescription" type="text" /> */}

        <FormControl validationCallback={validateRequired} id={"lookingForAJobDescription"} componentType={"input"} name={"lookingForAJobDescription"}type={"text"}/>
           {errors && <div>{errors.lookingForAJobDescription}</div>}
             {profile.contacts && 
                Object.keys(profile.contacts).map((_,i) => {
                    const contactName = Object.keys(profile.contacts)[i]
                 return <li>{contactName}:<Field validate={isValidUrl} id={`contacts.${contactName}`} name={`contacts.${contactName}`} /></li>
                    
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