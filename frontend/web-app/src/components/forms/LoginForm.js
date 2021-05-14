import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux'
import { Formik } from "formik";
import * as Yup from "yup";

import { setAccessToken, setId } from '@components/authentication'
import Button from "@components/Button"
import { VerticalFlexContainer } from "@components/containers"
import { H1 } from "@components/headers"
import TextInput from "@components/inputs/TextInput"
import { AUTHENTICATE_USER } from '@components/mutations'
import { set } from '@components/slices/loginSlice'
import Text from "@components/Text"



const LoginForm = ({ swap = () => null }) => {
  const [authenticateUser] = useMutation(AUTHENTICATE_USER)
  const dispatch = useDispatch()

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } }

  const loginSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required")
  })

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={async (values, { setErrors, setStatus }) => {
        let response = await authenticateUser({
          variables: { input: { ...values } },
        })
        if (response.data.authenticateUser.__typename === "AuthenticateUserSuccess") {
          setAccessToken(response.data.authenticateUser.token)
          setId(response.data.authenticateUser.user.localId)
          dispatch(set(true))
          if (location.pathname == "/login") {
            history.replace(from)
          }
        }
      }}>

      {({
        handleSubmit,
        handleChange,
        handleBlur,
        touched,
        errors,
      }) => (
        <form onSubmit={handleSubmit}>
          <VerticalFlexContainer style={{ justifyContent: 'space-around' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <H1 style={{}}>Log in</H1>
              <Text style={{ textAlign: 'bottom', cursor: 'pointer' }} onClick={swap}>Sign up</Text>
            </div>

            <>
              <Text>Username: </Text>
              <TextInput name="username" onChange={handleChange} onBlur={handleBlur} />
              {touched.username && errors.username
                ? <Text style={{ fontSize: 14, color: '#ff0000' }}>{errors.username}</Text>
                : null
              }
            </>

            <>
              <Text>Password: </Text>
              <TextInput type="password" name="password" onChange={handleChange} onBlur={handleBlur} />
              {touched.password && errors.password
                ? <Text>{errors.password}</Text>
                : null
              }
            </>

            <div style={{ paddingTop: 20, display: 'flex', justifyContent: 'center' }}>
              <Button>submit</Button>
            </div>
          </VerticalFlexContainer>
        </form>
      )}
    </Formik>
  )
}

export default LoginForm