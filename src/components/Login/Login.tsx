import { Field, Form, Formik, FormikHelpers } from "formik";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { logIn } from "../../redux/reducers/authReducer";
import s from './Login.module.scss'

interface Values {
    password: string
    email: string
    rememberMe: boolean
  }

  const Login = () => {

    const dispatch = useDispatch<any>()

    function validateEmail(value: string) {
      let error;
      if (!value) {
        error = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Invalid email address';
      }
      return error;
    }

    function validatePassword(value: string) {
      let error;
      if (!value) {
        error = 'Required';
      }

      return error;
    }
    
/*     function validateUsername(value: string) {
      let error;
      if (value === 'admin') {
        error = 'Nice try!';
      }
      return error;
    } */
    return  (
        <div>
          <h1>Log in</h1>
          <Formik
            initialValues={{
              password: '',
              email: '',
              rememberMe: false
            }}
            onSubmit={(
              values: Values,
              { setSubmitting }: FormikHelpers<Values>
            ) => {
              setTimeout(() => {
                dispatch(logIn(values))
                setSubmitting(false);
              }, 500);
            }}
          >
            {({ errors, touched }) => ( 
            <Form>
            <div className={s.formRow}>
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                placeholder="john@acme.com"
                type="email"
                validate={validateEmail}
                className={s.input}
              />
              {errors.email && touched.email && <div>{errors.email}</div>}
              </div>
            <label htmlFor="password">Password</label>
              
            <div className={s.formRow}>
              <Field id="password" name="password" placeholder="Password" type="password" validate={validatePassword} className={s.input}/>
              {errors.password && touched.password && <div>{errors.password}</div>}

            </div>
                <label htmlFor="rememberMe">Remember me</label>
              <Field id="rememberMe" name="rememberMe"  type="checkbox"/>
              <button type="submit" className={s.btn}>Submit</button>
            </Form>)}
          </Formik>
        </div>
    )
}

export default Login