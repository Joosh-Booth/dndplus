import { gql } from '@apollo/client';

export const AUTHORISE_USER = gql`
  mutation authoriseUserMutation ($input: AuthoriseUserInput!){
    authoriseUser(input: $input) {
      __typename
      ... on AuthoriseUserSuccess {
        user {
          localId
        }
        token
      }
      ... on AuthoriseUserError {
        nonFieldErrors 
      }
    }
  }
`;