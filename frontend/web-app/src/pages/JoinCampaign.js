import { useMutation } from "@apollo/client";
import { gql } from '@apollo/client';
import { Cookies } from "globalthis/implementation";
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

const JoinCampaign = () =>{

  const [isAuthenticated] = useMutation(IS_AUTHENTICATED)


  return (
    <>
      JOIN CAMPAIGN
      <br/>
      Recent Campgaigns | select from your campaigns | join a new campaigns
      <form
        onSubmit={e=>{
          e.preventDefault();
          let response = isAuthenticated({
            variables:{input:{
              id : getId(),
              token: getAccessToken()
            }}
          })
        }}
      >
        <button type="submit">test</button>
      </form>


      
    </>
  )
};

export default JoinCampaign