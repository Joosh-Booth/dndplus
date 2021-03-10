import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { Formik } from "formik";
import * as Yup from "yup";
import { mixed } from "yup";

import Button from "@components/Button"
import { VerticalContainer } from "@components/containers"
import { H1 } from "@components/headers"
import TextInput from "@components/inputs/TextInput"
import { CREATE_USER } from '@components/mutations'
import Text from "@components/Text"

//put signup form and login form in seperate component that changes state depending on which one is open.
//clicking logging or signup switches state to other.
const FIELD_ERROR_TO_FIELD_MAP = {
  EMAIL: "email",
  PASSWORD: "password",
  USERNAME: "username",
};

const mapFieldErrors = (fieldErrors) =>
  fieldErrors.reduce((acc, value) => {
    acc[FIELD_ERROR_TO_FIELD_MAP[value.fieldName]] = value.errors[0];
    return acc;
  }, {});


const SignupForm = ({ swap = () => null }) => {
  const signupSchema = Yup.object({
    username: Yup.string(
    ).required(
      "A username is required"
    ).max(
      10, "too long"
    ).matches(
      "^[a-zA-Z0-9]*$",
      { message: "invalid", excludeEmptyString: true }
    ),
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    passwordConfirmation: mixed().test(
      "match",
      "Passwords do not match", // your error message
      function () {
        return this.parent.password === this.parent.passwordConfirmation;
      }
    )
  })
  const [success, setSuccess] = useState(false)
  const [createUser] = useMutation(CREATE_USER)



  return (
    !success ? <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={signupSchema}
      onSubmit={async (values, { setErrors, setStatus }) => {
        delete values.passwordConfirmation // Remove extra input field as it is only used for validation
        let response = await createUser({
          variables: { input: { ...values } },
        })
        if (response.data) {
          if (response.data.createUser.__typename === "CreateUserSuccess") {
            setSuccess(true)
          } else if (response.data.createUser.__typename === "CreateUserError") {
            const { fieldErrors, nonFieldErrors } = response.data.createUser;
            if (fieldErrors && fieldErrors.length > 0) {
              const errors = mapFieldErrors(fieldErrors)
              setErrors(errors);

              const nodeList = document.getElementsByName(
                Object.keys(errors)[0]
              );
              const element = nodeList[0];
              element.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
              });
            }
            if (nonFieldErrors && nonFieldErrors.length > 0) {
              setStatus(nonFieldErrors[0]);
            }
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
          <VerticalContainer style={{ justifyContent: 'space-around' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <H1 style={{}}>Sign up now</H1>
              <Text style={{ textAlign: 'bottom', cursor: 'pointer' }} onClick={swap}>Log in</Text>
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
              <Text>Email: </Text>
              <TextInput name="email" onChange={handleChange} onBlur={handleBlur} />
              {touched.email && errors.email
                ? <Text>{errors.email}</Text>
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

            <>
              <Text>Confirm Password: </Text>
              <TextInput type="password" name="passwordConfirmation" onChange={handleChange} onBlur={handleBlur} />
              {touched.passwordConfirmation && errors.passwordConfirmation
                ? <Text>{errors.passwordConfirmation}</Text>
                : null
              }
            </>

            <div style={{ paddingTop: 20, display: 'flex', justifyContent: 'center' }}>
              <Button>submit</Button>
            </div>
          </VerticalContainer>
        </form>
      )}
    </Formik> : <Text>Success</Text>
  );
}


export default SignupForm;