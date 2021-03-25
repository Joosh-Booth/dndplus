import { useState } from 'react';
import { useMutation } from "@apollo/client";
import { gql } from '@apollo/client';
import { Formik } from "formik";

import { getAccessToken, getId } from "@components/authentication"


const IS_AUTHENTICATED = gql`
  mutation IsAuthenticated($input:IsAuthenticatedInput!) {
    isAuthenticated(input: $input) {
        __typename
        ... on IsAuthenticatedSuccess{
          string
        }
        ... on IsAuthenticatedError{
          nonFieldErrors
        } 
    }
  }
`;

const JoinCampaign = () => {

  const [loggedInState, setLoggedInState] = useState(null)
  const [isAuthenticated] = useMutation(IS_AUTHENTICATED, {
    onError: (err) => { console.log(err); setLoggedInState("Not Logged In") }
  })

  return (
    <Formik
      initialValues={{}}
      onSubmit={async () => {

        let response = await isAuthenticated({
          variables: {
            input: {
              id: getId(),
              token: getAccessToken() || ""
            }
          }
        })
        if (response.data.isAuthenticated.__typename === "IsAuthenticatedSuccess") {
          setLoggedInState("Logged In")
        }
      }}>

      {({
        handleSubmit,
      }) => (
        <div>
          JOIN CAMPAIGN
          <br />
            Recent Campgaigns | select from your campaigns | join a new campaigns
          <form onSubmit={handleSubmit}>
            <button type="submit">Test whether a user is logged in</button>
          </form>
          {loggedInState}
        </div>
      )}
    </Formik>
  )
};

export default JoinCampaign


