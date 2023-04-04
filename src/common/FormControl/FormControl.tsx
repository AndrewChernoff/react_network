import { Field } from "formik"

type FormControlProps = {
  id?: string
  varlidationCallback?: (value: string) => void
  componentType: string
  placeholder: string
  name: string
  className?: string
  type: string
}

const FormControl = ({id, varlidationCallback, componentType, placeholder, name, className, type}:FormControlProps) => {
    return  <>
    <Field
    id={id}
    name={name}
    placeholder={placeholder}
    type={type}
    component={componentType}
    validate={varlidationCallback}
    className={className}
  />
  </>
}

export default FormControl