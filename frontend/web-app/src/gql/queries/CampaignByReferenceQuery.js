import { gql } from '@apollo/client';

export const CAMPAIGN_BY_REFERENCE = gql`
  query CampaignbyReference($reference: String!) {
    campaignByReference(reference: $reference) {
      isOwner
      title
      roomCode
      players{
        username
      }
    }
  }
`