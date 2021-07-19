
import { gql, useQuery } from "@apollo/client";

//Takes in page requested to view. Run query with page and user credentials to see if user is allowed on page. If success show children. 
//If not show "Authentication failed. Please ensure you are logged in and allowed to view this page."


const IS_ALLOWED_ON_PAGE = gql`
  query IsAllowedOnPage($page: String!){
    isAllowedOnPage(page: $page)
  }
`;

const AuthWrapper = ({page}) => {
  const { loading, error, data } = useQuery(IS_ALLOWED_ON_PAGE, {
    variables: {
      page: page
    }
  })

  if(loading) return <div>Loading</div>

  return(
    <div>
      {data.IsAllowedOnPage 
        ? <children/> 
        : <div>"Authentication Failed. Please ensure you are logged in and allowed to view this page" </div>}

    </div>
  );
}

export default AuthWrapper