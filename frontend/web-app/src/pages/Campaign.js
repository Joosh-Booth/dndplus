

import { useRef, useState } from "react"
import { gql, useLazyQuery } from "@apollo/client"
import { Redirect, Route } from "react-router"
import { AuthWrapper } from "@dnd/components/authentication"
import { HorizontalFlexContainer, VerticalFlexContainer } from "@components/containers"
import { HeaderButton } from "@components/buttons"
import { RegularText } from "@components/texts"
import DnD from "@images/DnD.bmp"
import { H1, H3 } from "@components/headers"
import { Sections } from "@components/sections"

const CAMPGIN_BY_REFERENCE = gql`
  query CampaignbyReference($reference: String!) {
    campaignByReference(reference: $reference) {
      title
      roomCode
    }
  }
`


const Campaign = () => {  
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

  if(!called) {
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

  const options=[
    {
      id:'notes',
      name:'Notes',
      children:(
        <>
          <hr style={{marginBottom:'13vh'}}/>
          <div style={{height:'87vh', padding:'10px 40px'}}>
            <H1>Notes</H1>
          </div>
        </>
      )
    },
    {
      id:'journal',
      name:'Journal',
      children:(
        <>
          <hr style={{marginBottom:'13vh'}}/>
          <div style={{height:'87vh', padding:'10px 40px'}}>
            <H1>Journal</H1>
          </div>
        </>
      )
    },
    {
      id:'map',
      name:'Map',
      children:(
        <>
          <hr style={{marginBottom:'13vh'}}/>
          <div style={{height:'87vh', padding:'10px 40px'}}>
            <H1>Map</H1>
          </div>
        </>
      )
    },
    {
      id:'noticeBoard',
      name:'Notice Board',
      children:(
        <>
          <hr style={{marginBottom:'13vh'}}/>
          <div style={{height:'87vh', padding:'10px 40px'}}>
            <H1>Notice Board</H1>
          </div>
        </>
      )
    },
    {
      id:'character',
      name:'Character',
      children:(
        <>
          <hr style={{marginBottom:'13vh'}}/>
          <div style={{height:'87vh', padding:'10px 40px'}}>
            <H1>Character</H1>
          </div>
        </>
      )
    },
  ]


  if (loading) return <div>Loading</div>

  return (
    <AuthWrapper page={"campaign"} params={reference}>
      <div style={{ margin: '80px 80px' }}>
        <HorizontalFlexContainer style={{height:"45vh", marginBottom:150}}>
          {/* Image and Button */}
          <VerticalFlexContainer style={{width:"45%"}}>
            <div style={{
              height:'100%',              
              width:'100%',              
              backgroundImage: `url(${DnD})`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              borderRadius:10,
            }}/>

            <div css={{
              textAlign:'center',
              borderRadius:2,
              backgroundColor:'#475737',
              marginTop:10,
              width:'40%',
              alignSelf:'center',
              border:'1px solid #366eb3',
              ':hover':{
                boxShadow: '0px 0px 5px 0px rgba(12,121,204,0.88)'

              },
              ':active':{
                transition:'box-shadow 0ms ease',
                boxShadow:'inset 0 -1px 3px rgba(0,0,0,0.5)'
              },
              transition:'box-shadow 150ms ease'
            }}>
              <H3 style={{lineHeight:1}}>Launch</H3>
            </div>
          </VerticalFlexContainer>
          
          {/* Title and description */}
          <VerticalFlexContainer style={{margin:'0px 50px', width:"50%", }}>
            <div style={{textAlign:'center', padding:'20px 0px 60px 0px'}}>
              <H3 style={{lineHeight:1}}>{data&&data.campaignByReference.title}</H3> 
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


        <Sections options={options} />
      </div>
    </AuthWrapper>
  )
}

export default Campaign
