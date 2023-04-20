import { Field, Form, Formik, FormikHelpers } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import FormControl from "../../common/FormControl/FormControl";
import { AppDispatch, AppState } from "../../redux/reducers";
import { logIn } from "../../redux/reducers/authReducer";
import s from './Login.module.scss'

interface Values {
    password: string
    email: string
    rememberMe: boolean
    captcha: string
  }

  const Login = () => {
    const isAuth = useSelector<AppState, boolean>(state => state.auth.isAuth)
    const loginError = useSelector<AppState, boolean>(state => state.auth.loginError)
    const captchaImg = useSelector<AppState, string | null>(state => state.auth.captcha)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();

    useEffect(() => {
      if(isAuth) navigate("/profile");
    },[isAuth])

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
    
    return  (
        <div>
          <h2>Log in</h2>
          <Formik
            initialValues={{
              password: '',
              email: '',
              rememberMe: false,
              captcha: ''
            }}
            onSubmit={(
              values: Values,
              { setSubmitting }: FormikHelpers<Values>
            ) => {
              setTimeout(() => {
                const formValues = {
                  password: values.password,
                  email: values.email,
                  rememberMe: values.rememberMe,
                  captcha: values.captcha
                }
                dispatch(logIn(values))
                setSubmitting(false);
              }, 500);
            }}
          >
            {({ errors, touched }) => ( 
            <Form>
            <div className={s.formRow}>
              <label htmlFor="email">Email</label>
              <FormControl name="email"
                id="email"
                placeholder="john@acme.com"
                type="email"
                validationCallback={validateEmail}
                componentType={'input'}
                className={errors.email && touched.email ? s.errorInput : s.input}/>
              {errors.email && touched.email && <div className={s.errorBlock}>{errors.email}</div>}
              </div>
              
            <div className={s.formRow}>
              <label htmlFor="password">Password</label>
              <FormControl name="password"
                id="password"
                placeholder="Password"
                type="Password"
                validationCallback={validatePassword}
                componentType={'input'}
                className={errors.password && touched.password ? s.errorPasswordInput : s.input}/>
              {errors.password && touched.password && <div className={s.errorBlock}>{errors.password}</div>}

            </div>
                <label htmlFor="rememberMe">Remember me</label>
              <Field id="rememberMe" name="rememberMe"  type="checkbox"/>
              <button type="submit" className={s.btn}>Submit</button>
              {loginError ? <div className={s.errorBlock}>'Incorrect Email or Password'</div>: null}


              {captchaImg && <div> 
              <img src={captchaImg} alt='captcha'/>
              {/* <input type='text'/> */}
              <Field id="captcha" name="captcha"  type="input"/>

            </div>}
            </Form>)}
          </Formik>
        </div>
    )
}

export default Login