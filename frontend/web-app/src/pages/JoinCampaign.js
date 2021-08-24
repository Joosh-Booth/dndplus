import { useState } from 'react';
import Helmet from 'react-helmet'
import DetectableOverflow from 'react-detectable-overflow';
import { Link } from 'react-router-dom';

import { useQuery } from "@apollo/client"

import { CampaginItem } from "@components/Campaignitem"
import { VerticalFlexContainer, HorizontalFlexContainer } from '@components/containers';
import { CAMPAIGN_BY_USER } from '@gql/queries';


const JoinCampaign = () => {
  const { data, loading, error } = useQuery(CAMPAIGN_BY_USER, {
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

      <HorizontalFlexContainer style={{
        borderRadius: 10,
        borderStyle: "solid",
        flexFlow: 'row wrap',
        paddingTop: 10,
        overflowY: 'hidden',
        height: 450,
        justifyContent: 'space-around'
      }}>
        {loading
          ? <div style={{ height: '100vh' }}>Loading</div>
          : data && data.campaignByUser.map((item, index) => {
            campaignCards += 1

            return index < 8
              ? <div style={{ margin: `15px 15px 15px 15px` }} key={item.roomCode}>
                <Link to={`/campaign?reference=${item.roomCode}`} css={{ textDecoration: 'none' }}>
                  <CampaginItem data={item}></CampaginItem>
                </Link>
              </div>
              : null

          })
        }
      </HorizontalFlexContainer>

      <div>INVITATIONS</div>
      {/* <AuthWrapper page={"campaign"} params={"F2TGHZG"} /> */}
    </VerticalFlexContainer>
  )
};

export default JoinCampaign


