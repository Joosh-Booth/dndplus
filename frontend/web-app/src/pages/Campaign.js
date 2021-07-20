

import { gql, useQuery } from "@apollo/client"
import { Redirect, Route } from "react-router"


const CAMPGIN_BY_REFERENCE = gql`
  query CampaignbyReference($reference: String!) {
    campaignByReference($reference: reference) {
      campaign { 
        name
        reference
      }
    }
  }
`


const Campaign = ({reference}) => {

  //Check for Campain
  //Check if User is allowed to view campaign
  const {data, loading, error} = useQuery(CAMPGIN_BY_REFERENCE,{
    variables:{
      reference:reference||new URL(location.href).searchParams.get("reference")
    }
  })

  if (loading) return <div>loading</div>


  return (
    <AuthWrapper page={"campaign"} params={location.search}>
      This should contain campaign data
    </AuthWrapper>
  )
}



<Route
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
/>