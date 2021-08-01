

import { useState } from "react"
import { gql, useLazyQuery } from "@apollo/client"
import { Redirect, Route } from "react-router"
import { AuthWrapper } from "@dnd/components/authentication"
import { HorizontalFlexContainer, VerticalFlexContainer } from "@components/containers"
import { HeaderButton } from "@components/buttons"
import { RegularText } from "@components/texts"
import DnD from "@images/DnD.bmp"
import { H1 } from "@components/headers"

const CAMPGIN_BY_REFERENCE = gql`
  query CampaignbyReference($reference: String!) {
    campaignByReference(reference: $reference) {
      title
      roomCode
    }
  }
`


const Campaign = () => {

  //Check for Campain
  //Check if User is allowed to view campaign
  
  const [getCampaign,{data, loading, error}] = useLazyQuery(CAMPGIN_BY_REFERENCE)
  const [called, setCalled] = useState(false)
  const reference = new URL(location.href).searchParams.get("reference")

  if(reference&&!called){
    setCalled(true)
    getCampaign({
      fetchPolicy: "network-only",
      variables:{
        reference:new URL(location.href).searchParams.get("reference")
      }
    })
  }

  if(!called) return (
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

  if (loading) return <div>Loading</div>

  return (
    <AuthWrapper page={"campaign"} params={reference}>
      <div style={{ margin: '80px 80px' }}>
        <HorizontalFlexContainer style={{height:"45vh", paddingBottom:'30px'}}>
          {/* Image and Button */}
          <VerticalFlexContainer style={{width:"45%"}}>
            <div style={{
              height:'100%',              
              width:'100%',              
              backgroundImage: `url(${DnD})`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              borderRadius:'10px 10px 0px 0px',
            }}/>

            <div css={{
              textAlign:'center',
              padding:10,
              borderRadius:'0px 0px 10px 10px',
              backgroundColor:'#589629',
              ':hover':{
                boxShadow:'inset 0 -1px 1px rgba(0,0,0,0.5)'
              },
              ':active':{
                transition:'box-shadow 0ms ease',
                boxShadow:'inset 0 -1px 3px rgba(0,0,0,0.5)'
              },
              transition:'box-shadow 150ms ease'
            }}>
              <H1 style={{color:'white'}}>Launch</H1>
            </div>
          </VerticalFlexContainer>
          
          {/* Title and description */}
          <VerticalFlexContainer style={{margin:'0px 50px', width:"50%", }}>
            <div style={{textAlign:'center', padding:'20px 0px 60px 0px'}}>
              <H1 style={{lineHeight:1}}>{data&&data.campaignByReference.title}</H1> 
            </div>

            <div style={{overflowY:'auto', }}>
              <RegularText>
                This is a description of the game, who knows what you are going to play. 
                It could be anything, really anything your mind comes to
                you can do. Thats the beauty fo Dungeons and Dragons.
                  
              </RegularText>
            </div>
          </VerticalFlexContainer>
          {/* Other players */}
          <div style={{border:'1px solid black', width:'20%', }}>
            players
          </div>
         
        </HorizontalFlexContainer>

        <HorizontalFlexContainer style={{marginTop:30, justifyContent:'space-around'}}>
          <HeaderButton title="Notes"/>
          <HeaderButton title="Journal"/>
          <HeaderButton title="Map"/>
          <HeaderButton title="Notice Board"/>
          <HeaderButton title="Character"/>
        </HorizontalFlexContainer>

      </div>

    </AuthWrapper>
  )
}

export default Campaign
