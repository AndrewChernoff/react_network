import { Field, Form, Formik, FormikHelpers } from "formik";

interface Values {
    password: string
    email: string
    rememberMe: boolean
  }

  const Login = () => {
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
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 500);
            }}
          >
            <Form>
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                placeholder="john@acme.com"
                type="email"
              />
    
            <label htmlFor="password">Password</label>
              <Field id="password" name="password" placeholder="Password" type="password"/>

              <label htmlFor="rememberMe">Remember me</label>
              <Field id="rememberMe" name="rememberMe"  type="checkbox"/>
              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </div>
    )
}

export default Login