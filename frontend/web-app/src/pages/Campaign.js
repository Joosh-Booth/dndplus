

import { gql, useLazyQuery } from "@apollo/client"
import { Redirect, Route } from "react-router"
import { AuthWrapper } from "@dnd/components/authentication"

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
//  console.log(reference || new URL(location.href).searchParams.get("reference"))
  
  const [getCampaign,{data, loading, error}] = useLazyQuery(CAMPGIN_BY_REFERENCE)
  const called = false;
  if(new URL(location.href).searchParams.get("reference")){
    called = true
    console.log("Trueasdadads")
    getCampaign({
      fetchPolicy: "network-only",
      variables:{
        reference:new URL(location.href).searchParams.get("reference")
      }
    })
  }

  if (called&&loading) return <div>loading</div>

  console.log(data)
  return (
    <AuthWrapper page={"campaign"} params={location.search}>
      This should contain campaign data
    </AuthWrapper>
  )
}

export default Campaign

{/* <Route
  render={({ location }) =>
  (
    <Redirect
      to={{
        pathname: "/join_game",
        state: { from: location }
      }}
    />
  )
  }
/> */}