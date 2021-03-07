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



const FIELD_ERROR_TO_FIELD_MAP = {
  PASSWORD: "password",
  USERNAME: "username",
};

const mapFieldErrors = (fieldErrors) =>
  fieldErrors.reduce((acc, value) => {
    acc[FIELD_ERROR_TO_FIELD_MAP[value.fieldName]] = value.errors[0];
    return acc;
  }, {});


const LoginForm = () =>{

  const signupSchema = Yup.object({
    username: Yup.string().required("Required" ),
    password: Yup.string().required("Required")
  })

  return(
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={signupSchema}
      onSubmit={async (values, { setErrors, setStatus }) => {
              
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