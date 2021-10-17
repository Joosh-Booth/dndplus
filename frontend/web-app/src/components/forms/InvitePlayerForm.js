import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux'
import { Formik } from "formik";
import * as Yup from "yup";

import { setAccessToken, setId } from '@components/authentication'
import { Button } from "@components/buttons"
import { VerticalFlexContainer } from "@components/containers"
import { H1 } from "@components/headers"
import { TextInput } from "@components/inputs"
import { setLogin } from '@components/slices/loginSlice'
import { RegularText } from "@components/texts"
import { CREATE_INVITATION } from '@gql/mutations'


//TODO: Create form design for and invite

const InvitePlayerForm = ({ swap = () => null }) => {
  const [createInvitation] = useMutation(CREATE_INVITATION)
  const [successfullInvite, setSuccessfullInvite] = useState(false)

  const inviteSchema = Yup.object({
    sent_to: Yup.string().required("Required").max(15),
  })

  if (successfullInvite) {
    return (
      <div>
        <H1>Invitationn successfull</H1>
      </div>
    )
  }

  return (
    <Formik
      initialValues={{ sent_to: "", room_code: "" }}
      validationSchema={inviteSchema}
      onSubmit={async (values, { setErrors, setStatus }) => {
        let response = await createInvitation({
          variables: { input: { ...values } },
        })
        if (response.data.authenticateUser.__typename === "AuthenticateUserSuccess") {

        } else if (response.data.authenticateUser.__typename === "AuthenticateUserError") {
          if (response.data.authenticateUser.nonFieldErrors.includes("Username and/or password was incorrect"))
            setErrors({
              username: response.data.authenticateUser.nonFieldErrors[0],
              password: response.data.authenticateUser.nonFieldErrors[0]
            })
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
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 20 }}>
              <H1 style={{}}>Log in</H1>
              <RegularText style={{ textAlign: 'bottom', cursor: 'pointer' }} onClick={swap}>Sign up</RegularText>
            </div>

            <>
              <RegularText>Username: </RegularText>
              <TextInput name="username" onChange={handleChange} onBlur={handleBlur} />
              {touched.username && errors.username
                ? <RegularText style={{ fontSize: 14, color: '#ff0000' }}>{errors.username}</RegularText>
                : null
              }
            </>

            <>
              <RegularText>Password: </RegularText>
              <TextInput type="password" name="password" onChange={handleChange} onBlur={handleBlur} />
              {touched.password && errors.password
                ? <RegularText style={{ fontSize: 14, color: '#ff0000' }}>{errors.password}</RegularText>
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

export default InvitePlayerForm