
import { gql, useQuery } from "@apollo/client";
import { IS_ALLOWED_ON_PAGE } from "@gql/queries";

//Takes in page requested to view. Run query with page and user credentials to see if user is allowed on page. If success show children. 
//If not show "Authentication failed. Please ensure you are logged in and allowed to view this page."



const AuthWrapper = ({ page, params, children }) => {
  const { loading, error, data } = useQuery(IS_ALLOWED_ON_PAGE, {
    fetchPolicy: "network-only",
    variables: {
      input: {
        page: page,
        params: params
      }
    }
  });

  if (loading) return <div>Loading</div>

  return (
    <div>
      {data&&data.isAllowedOnPage
        ? children
        : <div>"Authentication Failed. Please ensure you are logged in and allowed to view this page" </div>}

    </div>
  );
}

export default AuthWrapper