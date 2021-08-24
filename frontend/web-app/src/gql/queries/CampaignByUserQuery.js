import { gql } from '@apollo/client';

export const CAMPAIGN_BY_USER = gql`
  query CampaignByUser {
    campaignByUser { 
      title
      roomCode
    }
  }
`