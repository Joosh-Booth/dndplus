import { gql } from '@apollo/client';

export const CREATE_CAMPAGIN = gql`
    mutation createCampaignMutation($input: CreateCampaignInput!) {
        createCampaign(input: $input) {
            __typename
            ... on CreateCampaignSuccess {
                campaign {
                    title
                    roomCode
                }
            }
            ... on CreateCampaignError {
                nonFieldErrors
                fieldErrors {
                    fieldName
                    errors
                }
            }
        }
    }
`;