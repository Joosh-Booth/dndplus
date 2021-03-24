import {useState} from 'react';
import { useMutation } from "@apollo/client";
import { gql } from '@apollo/client';
import { getAccessToken, getId } from "@components/authentication"
import { Formik } from "formik";


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

const JoinCampaign = () =>{

  const [loggedInState,setLoggedInState] = useState(null)
  const [isAuthenticated,{error}] = useMutation(IS_AUTHENTICATED,{
    onError: (err) => {console.log("ee"); setLoggedInState("Not Logged In")}
  })


  return (
    <Formik
      initialValues={{  }}
      onSubmit={async () => {
        
        let response = await isAuthenticated({
          variables:{input:{
            id : getId(),
            token: getAccessToken()||"test"
          }}
        }).then((response)=>{console.log(response);console.log("in then");return response})
        if(response.data.isAuthenticated.__typename==="IsAuthenticatedSuccess"){
          setLoggedInState("Logged In") 
        }
      }}>

      {({
        handleSubmit,
      }) => (
        <div>
            JOIN CAMPAIGN
            <br/>
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


