import Helmet from 'react-helmet'
import { LoginForm } from '@components/forms'
import { selectLogin } from '@components/slices/loginSlice'
import { useSelector } from 'react-redux'


//Return home button
const Login = () => {
  const loggedIn = useSelector(selectLogin)
  return (
    <>
      <Helmet title="DNDPlus | Log in"/>
      {loggedIn ? "Youre already logged in" : <LoginForm />}
    </>
  )
}

export default Login