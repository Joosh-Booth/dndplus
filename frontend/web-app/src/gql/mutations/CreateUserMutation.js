import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUserMutation ($input: CreateUserInput!){
    createUser(input: $input) {
      __typename
      ... on CreateUserSuccess {
        user {
          localId
          email
          username
        }
      }
      ... on CreateUserError {
        nonFieldErrors
        fieldErrors {
          fieldName
          errors
        }
      }
    }
  }
`;