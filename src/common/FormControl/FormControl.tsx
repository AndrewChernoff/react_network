import { Field } from "formik"

type FormControlProps = {
  id?: string
  validationCallback?: (value: string) => void
  componentType: string
  placeholder?: string
  name: string
  className?: string
  type: string
  labelName?: string
}

const FormControl = ({id, validationCallback, componentType, placeholder, name, className, type, labelName}:FormControlProps) => {
    return  <>
    {labelName &&<label htmlFor={id}>{labelName}</label>}
    <Field
    id={id}
    name={name}
    placeholder={placeholder}
    type={type}
    component={componentType}
    validate={validationCallback}
    className={className}
  />
  </>
}

export default FormControl