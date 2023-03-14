import { Field } from "formik"

const FormControl = ({varlidationCallback, componentType, placeholder, name}:any) => {
    return  <Field
    name={name}
    placeholder={placeholder}
    type="text"
    component={componentType}
    validate={varlidationCallback}
  />
}

export default FormControl