import { Redirect, Route } from "react-router"
import { useSelector } from 'react-redux'
import { selectLogin } from '@components/slices/loginSlice'
import SSRLimiter from '@components/SSRLimiter'


export const PrivateRoute = ({ children, ...rest }) => {
  const loggedIn = useSelector(selectLogin)

  return (
    <SSRLimiter
      client={
        <Route
          {...rest}
          render={({ location }) =>
            loggedIn ? (children) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: location }
                }}
              />
            )
          }
        />
      }
      server={"SERVER"}
    />

  )
}

