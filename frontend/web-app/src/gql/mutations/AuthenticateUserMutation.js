import { gql } from '@apollo/client';

export const AUTHENTICATE_USER = gql`
  mutation AuthenticateUser($input:AuthenticateUserInput!) {
    authenticateUser(input: $input) {
      __typename
      ... on AuthenticateUserSuccess{
        user{
          localId
          username
        }
        token  
      }
      ... on AuthenticateUserError{
        nonFieldErrors
      } 
    }
}
`;