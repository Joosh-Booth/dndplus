import { gql } from '@apollo/client';

export const CREATE_INVITATION = gql`
  mutation CreateInvitation($input:CreateInvitationInput!) {
    createInvitation(input: $input) {
      __typename
      ... on CreateInvitationSuccess{
        message
      }
      ... on CreateInvitationError{
        fieldErrors{
            fieldName
            errors
        }
        nonFieldErrors
      } 
    }
  }
`;