import { gql } from '@apollo/client';

export const LEAVE_CAMPAIGN = gql`
  mutation LeaveCampaign($input:LeaveCampaignInput!) {
    leaveCampaign(input: $input) {
      __typename
      ... on LeaveCampaignSuccess{
        message
      }
      ... on LeaveCampaignError{
        fieldErrors{
          fieldName
          errors
        }
        nonFieldErrors
      } 
    }
  }
`;