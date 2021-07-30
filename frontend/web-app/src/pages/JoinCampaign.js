import Helmet from 'react-helmet'
import { gql, useMutation, useQuery } from "@apollo/client"
import { Formik } from "formik";
import DetectableOverflow from 'react-detectable-overflow';

import { getAccessToken, getId, AuthWrapper } from "@components/authentication"
import { VerticalFlexContainer, HorizontalFlexContainer } from '@dnd/components/containers';
import { CampaignItemCard } from '@dnd/components/CampaignItemCard';
import { CampaginItem } from "@components/Campaignitem"
import { useState } from 'react';
import { Link } from 'react-router-dom';

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
  const { data, loading, error } = useQuery(CAMPGIN_BY_USER, {
    fetchPolicy: "network-only"
  })
  var campaignCards = 0
  const [campaignOverflow, setCampaignOverflow] = useState(false)
  return (
    <VerticalFlexContainer style={{ margin: `0px 80px 0px 80px` }}>
      <Helmet title="DNDPlus | Join game" />
      JOIN CAMPAIGN
      <br />
      Recent Campgaigns | select from your campaigns | join a new campaigns
      <div>YOUR CAMPAIGNS</div>
      {/* Horizontal container that will hold campagin data */}

      <HorizontalFlexContainer style={{
        borderRadius: 10,
        borderStyle: "solid",
        flexFlow:'row wrap',
        paddingTop:10,
        overflowY:'hidden',
        height:450,
        justifyContent:'space-around'
      }}>
        {loading
          ? <div style={{height:'100vh'}}>Loading</div>
          : data.campaignByUser.map((item, index) => {
            campaignCards+=1

            return index < 8
              ? <div style={{ margin: `15px 15px 15px 15px` }} key={item.roomCode}>
                  <Link to={`/campaign?reference=${item.roomCode}`} css={{ textDecoration:'none' }}>
                    <CampaginItem data={item}></CampaginItem>
                  </Link>
                </div>
              :null
          
          })
        }
      </HorizontalFlexContainer>

      <div>INVITATIONS</div>
      <AuthWrapper page={"campaign"} params={"F2TGHZG"} />
    </VerticalFlexContainer>
  )
};

export default JoinCampaign


