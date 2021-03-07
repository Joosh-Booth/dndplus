import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { Formik } from "formik";
import * as Yup from "yup";
import { mixed } from "yup";

import Button from "@components/Button"
import { H1 } from "@components/headers"
import TextInput from "@components/inputs/TextInput"
import Text from "@components/Text"
import { VerticalContainer } from "@components/containers"
import { AUTHORISE_USER } from '@components/mutations'

import { useCookies } from 'react-cookie';


const LoginForm = () =>{
  const [authoriseUser] = useMutation(AUTHORISE_USER)
  const [cookies, setCookie] = useCookies(['token']);


  const signupSchema = Yup.object({
    username: Yup.string().required("Required" ),
    password: Yup.string().required("Required")
  })

  return(
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={signupSchema}
      onSubmit={async (values, { setErrors, setStatus }) => {
        let response = await authoriseUser({
          variables: { input: { ...values } },
        })
        console.log(response)
        setCookie('token', response.data.authoriseUser.token,{ path: '/' });
      }}>

      {({
        handleSubmit,
        handleChange,
        handleBlur,
        touched,
        errors,
      }) => (
        <form onSubmit={handleSubmit}>
          <VerticalContainer style={{ justifyContent: 'space-around' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <H1 style={{}}>Log in</H1>
              <Text style={{ textAlign: 'bottom' }}>Sign up</Text>
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
          </VerticalContainer>
        </form>
      )}
    </Formik>
  )
}

export default LoginForm