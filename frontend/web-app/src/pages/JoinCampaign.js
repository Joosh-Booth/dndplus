import { useState } from 'react';
import Helmet from 'react-helmet'
import { gql, useMutation, useQuery } from "@apollo/client"
import { Formik } from "formik";

import { getAccessToken, getId, AuthWrapper } from "@components/authentication"


const IS_AUTHENTICATED = gql`
  mutation IsAuthenticated($input:IsAuthenticatedInput!) {
    isAuthenticated(input: $input) {
        __typename
        ... on IsAuthenticatedSuccess{
          string
        }
        ... on IsAuthenticatedError{
          errors
        } 
    }
  }
`;


const CAMPGIN_BY_USER = gql`
  query CampaignbyUser {
    campaignByUser {
      
      title
      roomCode
      
    }
  }
`


const JoinCampaign = () => {

  const [loggedInState, setLoggedInState] = useState(null)
  const [isAuthenticated] = useMutation(IS_AUTHENTICATED, {
    onError: (err) => { console.log(err); setLoggedInState("Not Logged In") }
  })
  const {data, loading, error} = useQuery(CAMPGIN_BY_USER,{
    fetchPolicy: "network-only"
  })
  if(loading){return <div>QUERY IS LOADING SDFJASNFDIKJNSFDJANDFJN</div>}
  if(data){console.log(data)}
  return (
    <div>
      <Helmet title="DNDPlus | Join game" />
      JOIN CAMPAIGN
      <br />
      Recent Campgaigns | select from your campaigns | join a new campaigns
    
      <AuthWrapper page={"campaign"} params={"F2TGHZG"} />
    </div>     
  )
};

export default JoinCampaign


