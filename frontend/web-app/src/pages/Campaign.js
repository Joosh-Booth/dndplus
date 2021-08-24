

import { useState } from "react"
import { useLazyQuery, useMutation } from "@apollo/client"
import { Redirect, Route } from "react-router"
import { useHistory } from "react-router-dom";

import { AuthWrapper } from "@components/authentication"
import { LeaveCampaignButton, LaunchCampaignButton, Button } from "@components/buttons"
import { HorizontalFlexContainer, VerticalFlexContainer } from "@components/containers"
import { H1, H3, H4 } from "@components/headers"
import { CoupledModal, Modal } from "@components/Modals"
import PlayersList from "@components/PlayersList"
import { Sections } from "@components/sections"
import { RegularText } from "@components/texts"
import { CAMPAIGN_BY_REFERENCE } from "@gql/queries";
import { LEAVE_CAMPAIGN } from "@gql/mutations";
import DnD from "@images/DnD.bmp"


const Campaign = () => {
  const [getCampaign, { data, loading, error }] = useLazyQuery(CAMPAIGN_BY_REFERENCE)
  const [leaveCampaign] = useMutation(LEAVE_CAMPAIGN)

  const [called, setCalled] = useState(false)
  const reference = new URL(location.href).searchParams.get("reference")

  const [leaveCampaignModal, setLeaveCampaignModal] = useState(false)

  let history = useHistory();
  const handleLeaveCampaign = async () => {
    let response = await leaveCampaign({
      variables: { input: { roomCode: reference } }
    })
    if (response.data.leaveCampaign.__typename === "LeaveCampaignSuccess") {
      history.push('join_game', null)
    }
  }

  if (reference && !called) {
    setCalled(true)
    getCampaign({
      fetchPolicy: "network-only",
      variables: {
        reference: new URL(location.href).searchParams.get("reference")
      }
    })
  }

  if (!called) {
    return (
      <Route
        render={({ location }) =>
        (
          <Redirect
            to={{
              pathname: "/join_game",
              state: { from: location }
            }}
          />
        )}
      />
    )
  }

  const options = [
    {
      id: 'notes',
      name: 'Notes',
      children: (
        <>
          <hr style={{ marginBottom: '13vh' }} />
          <div style={{ height: '87vh', padding: '10px 40px' }}>
            <H1>Notes</H1>
          </div>
        </>
      )
    },
    {
      id: 'journal',
      name: 'Journal',
      children: (
        <>
          <hr style={{ marginBottom: '13vh' }} />
          <div style={{ height: '87vh', padding: '10px 40px' }}>
            <H1>Journal</H1>
          </div>
        </>
      )
    },
    {
      id: 'map',
      name: 'Map',
      children: (
        <>
          <hr style={{ marginBottom: '13vh' }} />
          <div style={{ height: '87vh', padding: '10px 40px' }}>
            <H1>Map</H1>
          </div>
        </>
      )
    },
    {
      id: 'noticeBoard',
      name: 'Notice Board',
      children: (
        <>
          <hr style={{ marginBottom: '13vh' }} />
          <div style={{ height: '87vh', padding: '10px 40px' }}>
            <H1>Notice Board</H1>
          </div>
        </>
      )
    },
    {
      id: 'character',
      name: 'Character',
      children: (
        <>
          <hr style={{ marginBottom: '13vh' }} />
          <div style={{ height: '87vh', padding: '10px 40px' }}>
            <H1>Character</H1>
          </div>
        </>
      )
    },
  ]

  if (loading) return <div>Loading</div>
  //Check to send user error if game doesnt exist
  return (
    <AuthWrapper page={"campaign"} params={reference}>
      <div style={{ margin: '80px 80px' }}>
        {data && data.campaignByReference.isOwner && "This is all true"}
        <HorizontalFlexContainer style={{ height: "45vh", marginBottom: 150 }}>
          {/* Image and Button */}
          <VerticalFlexContainer style={{ width: "45%", position: 'relative', justifyContent: 'space-around' }}>
            <div style={{
              height: '100%',
              width: '100%',
              backgroundImage: `url(${DnD})`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              borderRadius: 10,
            }} />

            <HorizontalFlexContainer style={{ justifyContent: 'space-around', margin: 5, }}>
              <LaunchCampaignButton />

              <CoupledModal
                modalOpenState={leaveCampaignModal}
                onClose={() => setLeaveCampaignModal(false)}
                modalElement={
                  <Modal
                    body={
                      <VerticalFlexContainer style={{ textAlign: 'center' }}>
                        <H4 >Are you sure you want to leave this campaign?</H4>
                        <HorizontalFlexContainer style={{ justifyContent: 'space-evenly', marginTop: 40 }}>
                          <Button onClick={handleLeaveCampaign}>Yes</Button>
                          <Button onClick={() => setLeaveCampaignModal(false)}>No</Button>
                        </HorizontalFlexContainer>
                      </VerticalFlexContainer>
                    }
                  />}
                element={<LeaveCampaignButton onClick={() => setLeaveCampaignModal(true)} />}
              />

            </HorizontalFlexContainer>

          </VerticalFlexContainer>

          {/* Title and description */}
          <VerticalFlexContainer style={{ margin: '0px 50px', width: "50%", }}>
            <div style={{ textAlign: 'center', padding: '20px 0px 60px 0px' }}>
              <H3 style={{ lineHeight: 1 }}>{data && data.campaignByReference.title}</H3>
            </div>

            <div style={{ overflowY: 'auto', }}>
              <RegularText>
                This is a description of the game, who knows what you are going to play.
                It could be anything, really anything your mind comes to
                you can do. Thats the beauty fo Dungeons and Dragons.

              </RegularText>
            </div>
          </VerticalFlexContainer>
          {/* Other players */}
          <div style={{ width: "20%", }}>
            <PlayersList players={data && data.campaignByReference.players} owner={data && data.campaignByReference.owner} />
          </div>
        </HorizontalFlexContainer>


        <Sections options={options} />
      </div>
    </AuthWrapper>
  )
}

export default Campaign
